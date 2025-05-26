import ratelimit from '../config/upstsh.js'

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit"); // At hera in use "userid" insted of "my-rate-limit"

        if(!success) {
            return res.status(429).json({message:'Too many request, please try again later'});
        }

        next();

    } catch (error) {
        console.log("Request limit error:", error);
        next(error);
    }
};

export default rateLimiter