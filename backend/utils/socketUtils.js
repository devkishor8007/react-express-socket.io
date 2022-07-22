const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("a user is connected ", socket.id);

    socket.on("message", (msg) => {
      console.log(`message from ${socket.id}: ${msg}`);
    });

    socket.on("send_message", (data) => {
      console.log(`message is sending from ${socket.id}:`, data)
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disonnected`);
    });
  });
};
