export interface IChangePassword {
	enterNewPassword: string;
	reenterNewPassword: string;
}

export interface INewPassword {
	enterEmail: string;
}

export interface IArrowsIconProps {
    classNames?: string
  }

export interface IEmailIconProps {
    classNames?: string
  }

export interface ILetterIconProps {
    classNames?: string
  }

export interface IManIconProps {
    classNames?: string
  }

export interface IQuestionIconProps {
	classNames?: string
}

export interface IPaperAirLineIconProps {
    classNames?: string
}

export interface IVisibilityOffIconProps {
	classNames?: string;
	cb?: () => void;
}