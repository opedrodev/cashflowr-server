import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

class Token {
    public static create(id: string, rememberMe: boolean) {
        return jwt.sign(
            { id },
            JWT_SECRET,
            { expiresIn: rememberMe ? '7d' : '4h' },
        );
    }

    public static verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}

export default Token;
