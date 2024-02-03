import { Context } from 'elysia';
Response;

type ErrorHandlerContext = Context & {
    code: string;
    error: Error;
};

export const errorHandler = ({ code, error, set }: ErrorHandlerContext) => {
    //    console.log('ERROR HANDLER TRIGERED');
    switch (code) {
        case 'AuthenticationError':
            return (set.redirect = '/');

        default:
            return Response.json(
                {
                    message: error.message,
                    error: 'uknown error',
                    hello: 'default error',
                },
                { status: 400 },
            );
    }
    console.log('ERROR', error);
};
