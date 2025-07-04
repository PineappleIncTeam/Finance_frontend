import cn from "classnames";

import { IAppButton } from "../../types/common/UiKitProps";

import style from "./Button1.module.scss";

const Button = ({ children, onClick, type = "button", className, variant, isLarge, ...props }: IAppButton) => {
	return (
		<button
			className={cn(style.button, { [style.large]: isLarge }, className)}
			onClick={onClick}
			type={type}
			data-style={variant}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
