export interface IChangePassword {
	enterNewPassword: string;
	reenterNewPassword: string;
}

export interface INewPassword {
	enterEmail: string;
}
 
export interface IIconsProps {
  classNames?: string
}

export interface IVisibilityOffIconProps {
	classNames?: string;
}

export interface INewPasswordModalProps {
  email: string;
}