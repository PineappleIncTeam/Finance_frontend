import cn from "classnames";

import { IAppButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const FileButton = ({ children, onClick, type, className, ...props }: IAppButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type={type} {...props}>
			{children}
		</button>
	);
};

export default FileButton;
