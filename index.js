import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin:process.env.URL_ORIGIN
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
