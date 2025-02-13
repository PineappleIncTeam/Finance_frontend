import cn from "classnames";

import { IHeaderButton } from "../../types/common/UiKitProps";

import style from "./button.module.scss";

const HeaderButton = ({ children, onClick, className, variant, ...props }: IHeaderButton) => {
	return (
		<button className={cn(style.button, className)} onClick={onClick} type="button" data-style={variant} {...props}>
			{children}
		</button>
	);
};

export default HeaderButton;
