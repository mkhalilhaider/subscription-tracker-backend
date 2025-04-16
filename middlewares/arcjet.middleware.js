import aj from "../config/arcjet.js";
import {ARCJET_ENV} from "../config/env.js";

const arcjetMiddlware = async (req, res, next) => {
  try {

    if (ARCJET_ENV === "development") {
        return next();
      }

    const decision = await aj.protect(req, {requested:1});

    if (decision.isDenied()) {

    if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Too Many Requests" });
    if (decision.reason.isBot()) return res.status(403).json({ error: "Bot Detected" });
    
    return res.status(403).json({ error: "Access Denied" });
    
    }
    next();
  } catch (error) {
    console.log("Arcjet Middleware Error: ", error);
    next(error);
  }
};

export default arcjetMiddlware;