import cn from "classnames";

import { IAddButton } from "../../../types/common/UiKitProps";

import style from "./fileButton.module.scss";

const FileButton = ({ children, onClick, type, className, ...props }: IAddButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type={type} {...props}>
			{children}
		</button>
	);
};

export default FileButton;
