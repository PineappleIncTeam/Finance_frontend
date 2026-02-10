import { IIconsProps } from "../../../types/common/PagesProps";

export const CloseIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="20"
			height="20"
			viewBox="0 0 17 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M1.35352 1L15.3535 15" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
			<path d="M1.35352 15L15.3535 1" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
};
