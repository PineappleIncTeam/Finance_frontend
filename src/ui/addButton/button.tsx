import cn from "classnames";

import { IAddButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const AddButton = ({ children, onClick, type, className, ...props }: IAddButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type={type} {...props}>
			<span className={style.buttonText}>{children}</span>
		</button>
	);
};

export default AddButton;
