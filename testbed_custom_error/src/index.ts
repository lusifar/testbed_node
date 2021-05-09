import express from "express";
import { json } from "body-parser";

import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(json());
app.use(errorHandler);


app.listen(3030, () => {
  console.log("the server is running");
});
