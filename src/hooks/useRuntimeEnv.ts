"use client";

import { useState, useEffect, useCallback } from "react";
import { env } from "next-runtime-env";

import { IEnvValidationResult } from "../types/components/ComponentsTypes";

export function useRuntimeEnv(requiredVars: string[] = []) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [validation, setValidation] = useState<IEnvValidationResult>({
		isValid: true,
		missingVars: [],
		errors: [],
		envVars: {},
	});

	const timerDelay = 100;

	const validateEnvVars = useCallback(() => {
		const missing: string[] = [];
		const errors: string[] = [];
		const envVars: Record<string, string | undefined> = {};

		requiredVars.forEach((envVar) => {
			const value = env(envVar);
			envVars[envVar] = value;

			if (!value) {
				missing.push(envVar);
				errors.push(`Environment variable ${envVar} is required but not set`);
			}
		});

		const result = {
			isValid: missing.length === 0,
			missingVars: missing,
			errors,
			envVars,
		};

		setValidation(result);
		return result;
	}, [requiredVars]);

	const getEnvVar = useCallback((envVar: string, defaultValue?: string): string => {
		const value = env(envVar);
		if (!value && defaultValue === undefined) {
			throw new Error(`Environment variable ${envVar} is required but not set`);
		}

		return value || defaultValue || "";
	}, []);

	const getSafeEnvVar = useCallback(
		(envVar: string, defaultValue: string = ""): string => {
			try {
				return getEnvVar(envVar, defaultValue);
			} catch {
				return defaultValue;
			}
		},
		[getEnvVar],
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			validateEnvVars();
			setIsLoading(false);
		}, timerDelay);

		return () => clearTimeout(timer);
	}, [validateEnvVars]);

	return {
		...validation,
		isLoading,
		validateEnvVars,
		getEnvVar,
		getSafeEnvVar,
		env,
	};
}
