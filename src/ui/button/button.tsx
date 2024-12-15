import cn from "classnames/dedupe";

import { IButton } from "../../types/common/UiKitProps";

import styles from "./button.module.scss";

const Button = ({ content, styleName, onClick, type, children }: IButton) => {
	function getCorrectStyleName(styleName: string): string {
		if (styleName.includes(" ")) {
			const styleClassPair: string[] = styleName.split(" ");
			return cn(styles[styleClassPair[0]], styles[styleClassPair[1]]);
		}
		return styles[styleName];
	}

	return (
		<button className={getCorrectStyleName(styleName)} onClick={onClick} type={type}>
			<div className={getCorrectStyleName(styleName) + "__buttonName"}>{content}</div>
			<div className={getCorrectStyleName(styleName) + "__buttonIcon"}>{children}</div>
		</button>
	);
};

export default Button;
