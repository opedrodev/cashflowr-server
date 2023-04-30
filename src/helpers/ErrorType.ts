const enum ErrorType {
    NAME_MIN_LENGTH = 'Name must have at least 3 characters',
    EMAIL_INVALID_FORMAT = 'Email must have a valid format',
    PASSWORD_MIN_LENGTH = 'Password must have at least 6 characters',
    TYPE_INVALID_FORMAT = 'Type must be income or outcome',
    DESCRIPTION_MIN_LENGTH = 'Description must have at least 3 characters',
    CATEGORY_MIN_LENGTH = 'Category must have at least 3 characters',
    MIN_VALUE = 'Value must be greater than 0.00',
}

export default ErrorType;
