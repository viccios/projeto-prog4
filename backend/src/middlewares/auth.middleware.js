import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization || '';

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            message: 'Missing or invalid Authorization header'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.id,
            user_name: decoded.user_name
        };

        next();

    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Access token expired'
            });
        }

        return res.status(401).json({
            message: 'Invalid token'
        });

    }
}