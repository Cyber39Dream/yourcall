import { Server } from 'socket.io';
import { db } from '../config/database';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const initializeSocket = (io: Server) => {
  io.on('connection', async (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Authenticate socket connection
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        socket.disconnect();
        return;
      }

      const decoded: any = jwt.verify(token, JWT_SECRET);
      socket.data.userId = decoded.id;
      socket.data.username = decoded.username;
    } catch (error) {
      logger.warn('Socket auth failed');
      socket.disconnect();
      return;
    }

    // Join channel
    socket.on('join_channel', (channelId: string) => {
      socket.join(`channel_${channelId}`);
      logger.info(`${socket.data.username} joined channel ${channelId}`);

      // Notify others
      socket.to(`channel_${channelId}`).emit('user_joined', {
        username: socket.data.username,
        userId: socket.data.userId,
      });
    });

    // Leave channel
    socket.on('leave_channel', (channelId: string) => {
      socket.leave(`channel_${channelId}`);
      logger.info(`${socket.data.username} left channel ${channelId}`);

      socket.to(`channel_${channelId}`).emit('user_left', {
        username: socket.data.username,
        userId: socket.data.userId,
      });
    });

    // Send message
    socket.on('send_message', async (data: any) => {
      try {
        const { channelId, content } = data;

        // Save message to database
        const message = await db.one(
          `INSERT INTO messages (channel_id, user_id, content)
           VALUES ($1, $2, $3)
           RETURNING id, user_id, content, created_at`,
          [channelId, socket.data.userId, content]
        );

        // Broadcast to channel
        io.to(`channel_${channelId}`).emit('new_message', {
          id: message.id,
          userId: socket.data.userId,
          username: socket.data.username,
          content: message.content,
          createdAt: message.created_at,
        });

        logger.info(`Message sent in channel ${channelId}`);
      } catch (error) {
        logger.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Get channel messages
    socket.on('get_messages', async (data: any, callback: Function) => {
      try {
        const { channelId, limit = 50, offset = 0 } = data;

        const messages = await db.manyOrNone(
          `SELECT m.id, m.user_id, u.username, m.content, m.created_at
           FROM messages m
           JOIN users u ON m.user_id = u.id
           WHERE m.channel_id = $1
           ORDER BY m.created_at DESC
           LIMIT $2 OFFSET $3`,
          [channelId, limit, offset]
        );

        callback({ messages: messages.reverse() });
      } catch (error) {
        logger.error('Get messages error:', error);
        callback({ error: 'Failed to fetch messages' });
      }
    });

    // Typing indicator
    socket.on('typing', (channelId: string) => {
      socket.to(`channel_${channelId}`).emit('user_typing', {
        username: socket.data.username,
        userId: socket.data.userId,
      });
    });

    // Stop typing
    socket.on('stop_typing', (channelId: string) => {
      socket.to(`channel_${channelId}`).emit('user_stop_typing', {
        userId: socket.data.userId,
      });
    });

    // User presence
    socket.on('set_status', (status: string) => {
      socket.broadcast.emit('user_status_changed', {
        userId: socket.data.userId,
        username: socket.data.username,
        status, // online, away, dnd, offline
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
      socket.broadcast.emit('user_offline', {
        userId: socket.data.userId,
        username: socket.data.username,
      });
    });

    // Error handling
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });
};

export default initializeSocket;
