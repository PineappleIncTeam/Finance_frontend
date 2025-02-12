import cn from "classnames";

import { IDefaultButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const Button = ({ children, onClick, type, className, variant, size, ...props }: IDefaultButton) => {
	return (
		<button
			className={cn(style.button, className)}
			onClick={onClick}
			type={type}
			data-style={variant}
			data-size={size}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
