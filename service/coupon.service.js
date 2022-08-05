import Coupon from "../model/coupon.js";

/**
 * Get Coupon by location
 * @param {lat,long} - lat and long
 * @returns {Promise<Coupons[]>}
 */
const getCoupons = async (searchParams) => {
  try {
    const maxDistanceInMeter = 5000; // 5km
    const { latitude, longitude } = searchParams;
    const coupons = await Coupon.find({
      location: {
        $near: {
          $maxDistance: maxDistanceInMeter,
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
      expirationDate: {
        $gte: new Date(),
      },
    }).select("-_id -createdAt -updatedAt -__v -location._id");
    return {
      status: true,
      data: coupons,
    };
  } catch (err) {
    return {
      status: false,
      data: err,
    };
  }
};

/**
 * Get Coupon by location
 * @param {lat,long} - lat and long
 * @returns {Promise<boolean>}
 */
const addCoupon = async (addCouponDto) => {
  try {
    const alreadyExist = await isCodeAlreadyAdded(addCouponDto.couponCode);
    if (alreadyExist) {
      return {
        status: false,
        data: { message: "Coupon Code Already Added !" },
      };
    }

    let coupon = new Coupon(addCouponDto);
    const couponDetail = await coupon.save();
    return {
      status: true,
      data: couponDetail,
    };
  } catch (err) {
    return {
      status: false,
      data: {
        message: err,
      },
    };
  }
};

const isCodeAlreadyAdded = async (couponCode) => {
  const coupon = await Coupon.findOne(
    {
      couponCode,
    },
    "_id"
  );
  return !!coupon?._id;
};

export { getCoupons, addCoupon };
