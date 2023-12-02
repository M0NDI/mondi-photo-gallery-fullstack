const logger = (req, res, next) => {
    console.log(`Request made to ${req.url}`)
    next();
}

module.exports = logger;