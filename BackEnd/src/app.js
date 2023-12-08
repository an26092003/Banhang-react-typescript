import express from "express";
import mongoose from "mongoose";
import productsRouter from "../src/routers/products.js";
import authRouter from "../src/routers/auth.js";
import categoryRouter from "../src/routers/category.js";
import searchRouter from "../src/routers/search.js";
import commentRouter from "../src/routers/comments.js";
import user from "../src/routers/user.js";
import favourite from "../src/routers/favourite.js";
import sizeRouter from "./routers/size.js";
import brandRouter from "./routers/brand.js";
import colorRouter from "./routers/color.js";
import payMethod from './routers/pay.js';
import discount from './routers/discount.js';


import orderroute from "./routers/order.js";
import vnpay from './routers/vnpay.js'

import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import stripe from './routers/stripe.js'
import { sendEmail } from "./utils/sendEmail.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    name: 'accessToken',
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/DATN' }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1h
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
    secret: 'my-secret',
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", productsRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", searchRouter);
app.use("/api", user);
app.use("/api", commentRouter);
app.use("/api", favourite);
app.use("/api", sizeRouter);
app.use("/api", brandRouter);
app.use("/api", colorRouter);
app.use("/api", payMethod);
app.use("/api", discount);


app.use("/api", orderroute);

app.use('/stripe', stripe)

app.use('/api/vnpay', vnpay)


const PORT = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/DATN");



app.listen(PORT, () => {
  console.log(`server is running: http://localhost:${PORT}`);
});
