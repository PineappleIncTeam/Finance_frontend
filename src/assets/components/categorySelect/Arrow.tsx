import { IIconsProps } from "../../../types/common/PagesProps";

export const Arrow = ({ classNames }: IIconsProps) => {
	return (
		<svg
			className={classNames}
			width="20"
			height="20"
			viewBox="0 0 16 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7.29282 9.0607L0.646372 2.41425C0.451109 2.21899 0.451109 1.90241 0.646372 1.70714L1.35348 1.00004C1.54874 0.804776 1.86532 0.804775 2.06058 1.00004L7.64637 6.58582C7.84163 6.78109 8.15822 6.78109 8.35348 6.58582L13.9393 1.00004C14.1345 0.804776 14.4511 0.804776 14.6464 1.00004L15.3535 1.70714C15.5487 1.90241 15.5487 2.21899 15.3535 2.41425L8.70703 9.0607C8.31651 9.45122 7.68334 9.45122 7.29282 9.0607Z"
				fill="#DCDDDD"
			/>
		</svg>
	);
};
