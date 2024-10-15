import { IIconsProps } from "../../../types/common/PagesProps";

export const ArrowLeftIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21.5 12L3.5 12M3.5 12L9.68182 18M3.5 12L9.68182 6"
				stroke="#17191A"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
