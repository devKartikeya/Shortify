/* Middleware to lint request body */
/* Suppose to trim whitespace from string values and also from nested objects */

function lintMiddleware(req, res, next) {
    const body = req.body;

    for (const key in body) {
        if (typeof body[key] === "string") {
            body[key] = body[key].trim();
        } else if (typeof body[key] === "object" && body[key] !== null) {
            lintMiddleware({ body: body[key] }, res, next);
        }
    }
    next();
}

module.exports = lintMiddleware;