import ratelimit from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({
                message: "Too many requests"
            });
        }
        next();
    } catch (error) {
        console.error("We ran into an error:", error);
        next(error);
    }
}

export default rateLimiter;