
/*
NOTE: Elysia in built errors,
1. NOT_FOUND
2. INTERNAL_SERVER_ERROR
3. VALIDATION
4. PARSE
5. UNKNOWN (default)
ref: https://elysiajs.com/life-cycle/on-error.html
 */

export class AuthenticationError extends Error {
  constructor(public message: string) {
    super(message)
  }
}




/**
 * Custom Errors for .error() middleware
 * */
export const errors = {
  AuthenticationError
}
