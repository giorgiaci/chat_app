export const userValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 4,
                max: 32
            },
            errorMessage: "Username must be between 5 and 32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString:  {
            errorMessage: "Username must be a string"
        },

    },
    password: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Username must be between 5 and 32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString:  {
            errorMessage: "Username must be a string"
        },
    }
}