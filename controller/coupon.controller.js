import { couponService } from "../service/index.js";
import { z } from "zod";
import HttpStatus from "../util/statusCode.constant.js";

const getCoupons = async (req, res) => {
  try {
    // check if lat,long are provided
    const findCouponValidate = z.object({
      latitude: z
        .string({
          required_error: "latitude is required",
        })
        .trim(),
      longitude: z
        .string({
          required_error: "longitude is required",
        })
        .trim(),
    });

    const { success, error } = findCouponValidate.safeParse(req.query);
    if (!success) {
      // validation error
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: error.issues,
      });
    }

    const result = await couponService.getCoupons(req.query);
    return res.status(HttpStatus.OK).send(result);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const addCoupon = async (req, res) => {
  try {
    // validate the request payload
    const validateAddCoupon = z
      .object({
        name: z.string().trim().min(1),
        description: z.string().trim().min(1),
        couponCode: z.string().trim().min(1),
        expirationDate: z.preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        }, z.date()),
        location: z.object({
          type: z.enum(["Point"]),
          coordinates: z.number().array().length(2),
        }),
      })
      .strict();

    const { success, error } = validateAddCoupon.safeParse(req.body);
    if (!success) {
      // validation error
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: error.issues,
      });
    }

    // add coupon
    const couponDetails = await couponService.addCoupon(req.body);
    if (couponDetails.status) {
      // successfully added
      return res.status(HttpStatus.CREATED).send(couponDetails);
    }
    return res.status(HttpStatus.BAD_REQUEST).send(couponDetails);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

export { getCoupons, addCoupon };
