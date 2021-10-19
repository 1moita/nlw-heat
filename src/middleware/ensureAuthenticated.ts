import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const header = request.headers.authorization;

    if(!header) {
        return response.status(401).json({
            error: 'Invalid authentication token',
            error_code: 'invalid_token'
        });
    }

    const [, token] = header.split(' ');
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
        request.user_id = sub;

        return next();
    } catch {
        return response.status(401).json({
            error_code: 'token_expired'
        });
    }
}