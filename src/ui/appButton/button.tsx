import cn from "classnames";

import { IAppButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const AppButton = ({ children, onClick, type, className, variant, ...props }: IAppButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type={type} data-style={variant} {...props}>
			{children}
		</button>
	);
};

export default AppButton;
