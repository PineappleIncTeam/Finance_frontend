import cn from "classnames";

import { IAppButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const AppButton = ({ children, onClick, type, className, ...props }: IAppButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type={type} {...props}>
			<span className={style.buttonText}>{children}</span>
		</button>
	);
};

export default AppButton;
