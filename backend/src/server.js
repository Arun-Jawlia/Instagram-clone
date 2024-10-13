import dotenv from "dotenv"
import app from "./app.js";
import connectDatabase from "./db/index.js";

dotenv.config()

const PORT = 8000;
//  Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Error", err.message);
  console.log("Shutting Down the server for the handling uncaught exception");
});

// Connect to the database
connectDatabase()
  .then((res) => {
    console.log("Connected to database");
    
    const server = app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
    
    // Unhandled promise rejection handling
    process.on("unhandledRejection", (err) => {
      console.log(`Shutting down the server for ${err.message}`);
      console.log(`Shutting down the server for unhandled Rejection`);

      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the process if database connection fails
  });