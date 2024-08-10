const { rateLimit } = require ('express-rate-limit');

const rateLimiter = (windowMinutes = 15, maxRequests = 100) => {
    return rateLimit({
        // Convert minutes to milliseconds
        windowMs: windowMinutes * 60 * 1000, 
        // Limit each IP to `maxRequests` requests per `window`
        max: maxRequests, 
        // Include `RateLimit-*` headers (draft-7)
        standardHeaders: true, 
        // Disable the legacy `X-RateLimit-*` headers
        legacyHeaders: false, 
        handler: (request, response, next, options) => {
            // Send custom message when rate limit is exceeded
            res.status(options.statusCode).json({
                status: options.statusCode,
                message: 'Your limit has been exceeded. Please try again after 30 minutes.'
            });
        }
    });
};

module.exports = {rateLimiter}
