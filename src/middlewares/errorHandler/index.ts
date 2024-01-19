
import { Context } from "elysia"

type ErrorHandlerContext = Context & {
  code: string,
  error: Error
}

export const errorHandler = ({ code, error, set }: ErrorHandlerContext) => {
  switch (code) {
    case "AuthenticationError":
      Response.json({ message: error.message })
      break;

    default:
      Response.json({ message: error.message, error: "uknown error" })
      break;
  }
}
