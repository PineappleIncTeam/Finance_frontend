import Image from "next/image";
import Link from "next/link";

import { ISidebarMenu, IRenderProfileItem, IRenderNavItem } from "../../../../types/common/ComponentsProps";
import { sidebarNavMenu } from "../../../../helpers/sidebarNavMenu";
import { MainPath } from "../../../../services/router/routes";

import arrowRightIcon from "../../../../assets/components/userProfile/arrowRight.svg";
import navigationArrowIcon from "../../../../assets/components/userProfile/navigationArrow.svg";

import styles from "./privateProfileSidebarMenu.module.scss";

export const PrivateProfileSidebarMenu = ({ handleClick }: ISidebarMenu) => {
	const renderProfileItem = ({ title, handleClick }: IRenderProfileItem) => {
		const isButtonDisabled = title === "Архив";

		return (
			<button
				disabled={isButtonDisabled}
				className={styles.profileItemActionWrap}
				onClick={() => handleClick(title)}
				key={title}>
				<p className={styles.profileItemActionWrap__title}>{title}</p>
				<Image src={arrowRightIcon} alt={""} className={styles.profileItemActionWrap__iconElement} />
			</button>
		);
	};

	const renderNavItem = ({ title, link }: IRenderNavItem) => {
		return (
			<Link href={link || "#"}>
				<div className={styles.navLinkWrapper}>
					<p className={styles.navLinkWrapper__title}>{title}</p>
					<Image src={navigationArrowIcon} alt={""} className={styles.navLinkWrapper__iconElement} />
				</div>
			</Link>
		);
	};

	return (
		<div className={styles.sidebarNavWrap}>
			<div className={styles.sidebarProfileItems}>
				{sidebarNavMenu.map((menuItem) => renderProfileItem({ title: menuItem.title, handleClick }))}
			</div>
			<div className={styles.sidebarNavContainer}>
				{renderNavItem({ title: "О приложении", link: MainPath.AboutUs })}
				{renderNavItem({ title: "Блог", link: MainPath.Blog })}
			</div>
		</div>
	);
};
