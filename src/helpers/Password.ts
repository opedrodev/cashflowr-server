import bcrypt from 'bcryptjs';

class Password {
    public static hash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public static compare(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

export default Password;
