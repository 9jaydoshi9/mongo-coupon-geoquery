import * as express from "express";
import * as couponController from "../controller/coupon.controller.js";

const router = express.Router();

router.get("/", couponController.getCoupons);
router.post("/", couponController.addCoupon);

export default router;
