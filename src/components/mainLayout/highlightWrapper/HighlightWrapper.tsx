import { IHighlightWrapper } from "../../../types/common/ComponentsProps";

import "./HighlightWrapper.css";

export const HighlightWrapper = ({
	children,
	padding = "10px",
	shadowColor = "rgba(0, 0, 0, 0.1)",
}: IHighlightWrapper) => {
	return (
		<div
			className="highlight-wrapper"
			style={{
				padding,
				boxShadow: `0 0 8px ${shadowColor}`,
			}}>
			{children}
		</div>
	);
};
