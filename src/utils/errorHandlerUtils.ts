export class AppError extends Error {
	statusCode: number;

	constructor(message, statusCode = 500) {
		super(message);

		this.statusCode = statusCode;
		this.name = "AppError";
	}
}

export function handleServerError(error) {
	if (error instanceof AppError) {
		return {
			message: error.message,
			statusCode: error.statusCode,
		};
	}

	// console.error("Server error:", error);

	return {
		message: "Внутренняя ошибка сервера",
		statusCode: 500,
	};
}
