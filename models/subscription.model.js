import mongoose, { model } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      minLength: 4,
      maxLength: 100,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "PKR", "INR", "SAR", "GBP", "EUR"],
      default: "PKR",
      trim: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      trim: true,
      default: "monthly",
      lowercase: true,
    },
    category: {
      type: String,
      enum: ["entertainment", "health", "education", "news", "sports", "other"],
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
      lowercase: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date must be in the past",
      },
      default: Date.now,
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "Renewal date must be after the Start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
// Auto-calculate renewal date if missing
    if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );
  }

  // Auto-Update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

 // Convert the currency to uppercase before saving
 if (this.currency) {
    this.currency = this.currency.toUpperCase();
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;