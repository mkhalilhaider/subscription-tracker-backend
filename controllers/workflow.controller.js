import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import dayjs from "dayjs";
import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";

const reminder = [7, 3, 1];

//main function
export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal Date has passed for subscription ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for (const daysBefore of reminder) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before.`);
  }
});

//helper function to fetch data
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );
  });
};

// helper function to sleep reminders
const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

// helper function to trigger reminders
const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label}`);
    //send email
  });
};
