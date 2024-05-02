import cn from "classnames/dedupe";

import { IButton } from "../../types/common/ComponentsProps";

import styles from "./Button.module.css";

export const Button = ({ content, styleName, testId, onClick }: IButton) => {
	function getCorrectStyleName(styleName: string): string {
		if (styleName.includes(" ")) {
			const styleClassPair: string[] = styleName.split(" ");
			return cn(styles[styleClassPair[0]], styles[styleClassPair[1]]);
		}
		return styles[styleName];
	}

	return (
		<button data-testId={testId} className={getCorrectStyleName(styleName)} onClick={onClick} type="button">
			{content}
		</button>
	);
};
