import jwt from 'jsonwebtoken';

class Token {
    public static create(id: string, rememberMe: boolean) {
        return jwt.sign(
            { id },
            process.env.JWT_SECRET || 'jwt_secret',
            { expiresIn: rememberMe ? '7d' : '4h' },
        );
    }
}

export default Token;
