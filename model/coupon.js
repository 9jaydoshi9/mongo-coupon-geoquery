import mongoose from "mongoose";

let Schema = mongoose.Schema;

const locationPointSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

let CouponSchema = new Schema(
  {
    name: String,
    couponCode: String,
    description: String,
    expirationDate: Date,
    location: {
      type: locationPointSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CouponSchema.index({ location: "2dsphere" });
let Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;