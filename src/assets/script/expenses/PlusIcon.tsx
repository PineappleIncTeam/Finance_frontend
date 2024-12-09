import { IIconsProps } from "../../../types/common/PagesProps";

export const PlusIcon = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M3 12L21 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
			<path d="M12 3L12 21" stroke="white" strokeWidth="3" strokeLinecap="round" />
		</svg>
	);
};
