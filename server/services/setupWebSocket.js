const Product = require("../models/productSchema");

// function setupWebSocket(io) {
//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // Create a change stream to watch the Product collection
//     const changeStream = Product.watch();

//     // Listen for changes in the Product collection
//     changeStream.on("change", (change) => {
//       try {
//         if (
//           change.operationType === "update" &&
//           change.updateDescription?.updatedFields?.quantity !== undefined
//         ) {
//           socket.emit(
//             "stockUpdate",
//             change.updateDescription.updatedFields.quantity
//           );
//         }
//       } catch (error) {
//         console.error("Error processing change event:", error);
//       }
//     });

//     // Handle socket disconnection
//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);

//       // Clean up change stream when socket disconnects
//       if (changeStream) {
//         changeStream.close().catch((err) =>
//           console.error("Error closing change stream:", err)
//         );
//       }
//     });
//   });
// }

// module.exports = { setupWebSocket };



function setupWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const pollInterval = setInterval(async () => {
      try {
        const products = await Product.find({}).select("quantity");
        socket.emit("stockUpdate", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, 5000); // Poll every 5 seconds

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      clearInterval(pollInterval);
    });
  });
}

module.exports = { setupWebSocket };
