import { IIconsProps } from "../../../types/common/PagesProps";

export const ArrowRightSmallIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 12L21 12M21 12L14.8182 6M21 12L14.8182 18"
				stroke="#434546"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
