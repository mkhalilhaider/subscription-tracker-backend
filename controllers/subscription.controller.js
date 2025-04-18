import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  console.log("sub create func hitting");

  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscription = async (req, res, next) => {
  try {
    const allSubscription = await Subscription.find({});
    res.status(200).json({
      success: true,
      data: allSubscription,
    });
  } catch (error) {
    next(error);
  }
};

// export const getUserSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findById({ user:{_id:req.params.id}});
//     res.status(200).json({
//       success: true,
//       data: subscription,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
