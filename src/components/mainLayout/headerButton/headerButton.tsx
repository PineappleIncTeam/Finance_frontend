import cn from "classnames";

import { IHeaderButton } from "../../../types/common/UiKitProps";
import { InputTypeList } from "../../../helpers/Input";

import style from "./headerButton.module.scss";

const HeaderButton = ({ children, onClick, className, variant, ...props }: IHeaderButton) => {
	return (
		<button
			className={cn(style.button, className)}
			onClick={onClick}
			type={InputTypeList.Button}
			data-style={variant}
			{...props}>
			{children}
		</button>
	);
};

export default HeaderButton;
