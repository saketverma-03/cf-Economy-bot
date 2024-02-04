import { config } from '@config/index';
import { Context } from 'elysia';

type ErrorHandlerContext = Context & {
    code: string;
    error: Error;
};

export const errorHandler = ({
    code,
    error,
    set,
    request,
}: ErrorHandlerContext) => {
    //    console.log('ERROR HANDLER TRIGERED');
    if (config.env.NODE_ENV === 'devlopment') {
        console.error({ RequestUrl: request.url });
        console.error(error);
        console.log(code);
    }
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

/**
 *  possible types of errors
 *  AuthenticationError(message,requestUrl,errorCode)
 *  BotInteractionError(message,additionalInteraction,errorCode)
 *  DiscordApiError(message,additionalInfo)
 * */
