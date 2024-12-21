import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (httpServer) => {
  const socketServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map(); // {userId: socketId}
  const userActivities = new Map(); // {userId: activity}

  socketServer.on("connection", (socketClient) => {
    socketClient.on("user_connected", (userId) => {
      userSockets.set(userId, socketClient.id);
      userActivities.set(userId, "Idle");

      // broadcast to all connected sockets that this user is logged in
      socketServer.emit("user_connected", userId);

      socketClient.emit("users_online", Array.from(userSockets.keys()));

      // send all user activities
      socketServer.emit("activities", Array.from(userActivities.entries()));
    });

    socketClient.on("update_activity", (userId, activity) => {
      console.log("activity_updated", { userId, activity });
      userActivities.set(userId, activity);
      socketServer.emit("activity_updated", { userId, activity });
    });

    socketClient.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({ senderId, receiverId, content });

        // send to receiver in realtime, if they are online
        const receiverSocketId = userSockets.get(receiverId);

        if (receiverSocketId) {
          socketServer.to(receiverSocketId).emit("receive_message", message);
        }

        socketClient.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        socketClient.emit("message_error", error.message);
      }
    });

    socketClient.on("disconnect", () => {
      let disconnectedUserId;

      for (const [userId, socketId] of userSockets.entries()) {
        // find the disconnected user
        if (socketId === socketClient.id) {
          userSockets.delete(userId);
          userActivities.delete(userId);
          disconnectedUserId = userId;
          break;
        }
      }

      if (disconnectedUserId) {
        socketServer.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
