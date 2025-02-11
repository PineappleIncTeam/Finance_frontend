import Image from "next/image";

import cn from "classnames";

import crossIcon from "../../../assets/components/userProfile/crossIcon.svg";
import { IBurgerMenu } from "../../../types/components/ComponentsTypes";

import { useLockScroll } from "../../../hooks/useLockScroll";

import styles from "./burgerMenu.module.scss";

export const BurgerMenu = ({ children, showMenu, setShowMenu }: IBurgerMenu) => {
	const closeMenu = () => {
		setShowMenu(false);
	};

	useLockScroll(showMenu);

	return (
		<div
			className={cn(styles.burgerMenuWrapper, {
				[styles.burgerMenuWrapper__show]: showMenu,
			})}>
			<div
				className={cn(styles.burgerMenuContainer, {
					[styles.burgerMenuContainer__show]: showMenu,
				})}
				onClick={closeMenu}
				role="button"></div>
			<div
				role="menubar"
				className={cn(styles.burgerMenuSlide, {
					[styles.burgerMenuSlide__show]: showMenu,
				})}>
				<div className={styles.burgerMenuCross} onClick={closeMenu} role="button">
					<Image src={crossIcon} alt={"crossIcon"} className={styles.burgerMenuCross__icon} />
				</div>
				<div className={styles.burgerMenuContent}>{children}</div>
			</div>
		</div>
	);
};
