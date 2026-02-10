export interface IBeforeInstallPromptEventChoices {
	outcome: "accepted" | "dismissed";
	platform: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<IBeforeInstallPromptEventChoices>;
	prompt(): Promise<void>;
}

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Window {
		deferredPWAEvent: BeforeInstallPromptEvent | null;
	}
}
