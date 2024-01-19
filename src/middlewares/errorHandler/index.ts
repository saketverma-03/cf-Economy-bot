import { Context } from "elysia";

type ErrorHandlerContext = Context & {
	code: string;
	error: Error;
};

export const errorHandler = ({
	code,
	error,
	set,
	path,
}: ErrorHandlerContext) => {
	switch (code) {
		case "AuthenticationError":
			return Response.json({ message: error.message });

		case "VALIDATION":
			return Response.json({
				type: "validation error",
				message: `error in ${error.type} validation`,
				values: error.value,
			});

		default:
			return Response.json({ message: error.message, type: "Uknown Error" });
	}
};
