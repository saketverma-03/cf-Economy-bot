import { Context } from 'elysia';

type ErrorHandlerContext = Context & {
    code: string;
    error: Error;
};

export const errorHandler = ({ code, error, set }: ErrorHandlerContext) => {
    console.log('in error block');
    console.log(error.message);
    switch (code) {
        case 'AuthenticationError':
            set.redirect = '/';
            break;

        default:
            Response.json({ message: error.message, error: 'uknown error' });
            break;
    }
};
