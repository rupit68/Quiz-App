import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/router.js";
import path from "path";
// import coonection file
import connect from "./database/conn.js";

const app = express();

// app middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();

// application port
const port = process.env.PORT || 1011;
connect();
const __dirname1 = path.resolve();
// routes
app.use("/api", router); // apis

// app.get("/", (req, res) => {
//   try {
//     res.json("Get Request");
//   } catch (error) {
//     res.json(error);
//   }
// });
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot Connect To The Server");
    }
  })
  .catch((error) => {
    console.log("Invaild Database Connection");
  });
