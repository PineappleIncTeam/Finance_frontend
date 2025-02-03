import { IIconsProps } from "../../../types/common/PagesProps";

export const CheckIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="16"
			height="12"
			viewBox="0 0 16 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M1 7L5 11L15 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
};
