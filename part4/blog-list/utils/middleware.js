const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
	logger.info(new Date(), req.method, req.path, req.body);
	next();
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer "))
		req.token = authorization.substring(7);

	next();
};

const userExtractor = (req, res, next) => {
	const decodeToken = jwt.verify(req.token, process.env.SECRET);
	req.user = decodeToken.id;

	if (!decodeToken)
		return res.status(401).json({ error: "token missing or invalid" });

	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
	if (err.name === "CastError")
		return res.status(400).send({ error: "invalid id" });

	if (err.name === "ValidationError")
		return res
			.status(400)
			.send({ error: Object.values(err.errors)[0].message });

	if (err.name === "JsonWebTokenError")
		return res.status(401).json({ error: "invalid token" });

	if (err.name === "TokenExpiredError")
		return res.status(401).json({ error: "token expired" });

	logger.error(err.message);

	next(err);
};

module.exports = {
	requestLogger,
	tokenExtractor,
	userExtractor,
	unknownEndpoint,
	errorHandler,
};
