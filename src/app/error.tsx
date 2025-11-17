"use client";

import NextError from "next/error";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import "./error.css";

interface IGlobalError extends Error {
	message: string;
	stack: string;
	digest?: string;
}

interface IGlobalErrorPage {
	error: IGlobalError;
	reset: () => void;
}

export default function GlobalError({ error, reset }: IGlobalErrorPage) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	const handleReload = () => {
		window.location.href = "/";
	};

	const handleReport = () => {
		const email = "support@example.com";
		const subject = `Error Report: ${error.message}`;
		const body = `Error: ${error.stack}\n\nUser Agent: ${navigator.userAgent}\nURL: ${window.location.href}`;

		window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
	};

	function renderErrorIcon() {
		return (
			<svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
		);
	}

	function renderErrorDetails() {
		return (
			process.env.NODE_ENV === "development" && (
				<div className="errorDetailsWrap">
					<details>
						<summary className="errorDetailsWrap__summary">Детали ошибки (только для разработки)</summary>
						<pre className="errorDetailsWrap__stack">{error.stack}</pre>
					</details>
				</div>
			)
		);
	}

	return (
		<div className="globalErrorContainer">
			<div className="globalErrorCard">
				<div className="globalErrorHeader">
					<div className="errorIconWrap">{renderErrorIcon()}</div>

					<h1 className="globalErrorHeader__title">Произошла ошибка</h1>

					<p className="globalErrorHeader__description">
						{error.message || "Что-то пошло не так. Пожалуйста, попробуйте снова."}
					</p>
				</div>

				<div className="errorActionsWrap">
					<button onClick={reset} className="errorButton primary">
						Попробовать снова
					</button>

					<button onClick={handleReload} className="errorButton secondary">
						На главную
					</button>

					<button onClick={handleReport} className="errorButton outline">
						Сообщить об ошибке
					</button>
				</div>

				{renderErrorDetails()}

				<NextError statusCode={0} />
			</div>
		</div>
	);
}
