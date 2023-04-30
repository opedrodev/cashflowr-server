const USER = {
    name: 'User Testing',
    email: 'user@testing.com',
    password: 'testing_password',
};

const USER_SHORT_NAME = {
    name: 'Us',
    email: 'user@testing.com',
    password: 'testing_password',
};

const USER_INVALID_EMAIL = {
    name: 'User Testing',
    email: 'invalid_email',
    password: 'testing_password',
};

const USER_SHORT_PASSWORD = {
    name: 'User Testing',
    email: 'user@testing.com',
    password: '123',
};

const USER_WITH_ID = {
    _id: '644a08513cd8756738e87e45',
    name: 'User Testing',
    email: 'user@testing.com',
    password: 'testing_password',
};

const SIGNIN_BODY = {
    email: 'user@testing.com',
    password: 'testing_password',
    rememberMe: false,
};

const AuthMocks = {
    USER,
    USER_SHORT_NAME,
    USER_INVALID_EMAIL,
    USER_SHORT_PASSWORD,
    USER_WITH_ID,
    SIGNIN_BODY,
};

export default AuthMocks;
