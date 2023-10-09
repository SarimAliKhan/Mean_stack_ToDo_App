// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from 'express';
import serverless from 'serverless-http';
const todoRouter = require("./routes/Todo");
const loginRouter = require("./routes/login");

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

api.use("/api", todoRouter);
api.use("/user", loginRouter);

export const handler = serverless(api);
