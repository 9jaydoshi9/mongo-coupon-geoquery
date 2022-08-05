import * as express from "express";
import couponRoute from "./coupon.route.js" 

const router = express.Router();

router.use("/coupon", couponRoute);

export default router;
