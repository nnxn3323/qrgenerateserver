import express, { Express } from "express";
import routes from "./routes";
import connectDB from "./config/db";
import "dotenv/config";
const port = process.env.PORT || 5074;
const app: Express = express();
connectDB();
app.use(express.urlencoded());
app.use(express.json());

app.use(routes);
// error handler
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.send("Hello World");
  });
}
app
  .listen(port, () => {
    console.log(`
    Server listening on port: 5000 
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
