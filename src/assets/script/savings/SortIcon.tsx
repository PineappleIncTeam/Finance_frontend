import { IIconsProps } from "../../../types/common/PagesProps";

export const SortIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="15"
			height="24"
			viewBox="0 0 15 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M7.5 -0.326172L13.9952 10.4182H1.00481L7.5 -0.326172Z" fill="#DCDDDD" />
			<path d="M7.5 24.3262L1.00481 13.5818L13.9952 13.5818L7.5 24.3262Z" fill="#DCDDDD" />
		</svg>
	);
};
