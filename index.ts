// import express
import express from "express";
import type { Request, Response } from "express";

// import CORS
import cors from "cors";

// import body-parser
import bodyParser from "body-parser";

// import router
import router from "./routes";

// init app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// define port
const port: number = 3000;

// route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//define routes
app.use("/api", router);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
