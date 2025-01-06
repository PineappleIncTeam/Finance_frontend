import Image from "next/image";

import cn from "classnames";

import crossIcon from "../../../assets/components/userProfile/crossIcon.svg";
import { IBurgerMenu } from "../../../types/components/ComponentsTypes";

import styles from "./burgerMenu.module.scss";

export const BurgerMenu = ({ children, showMenu, setShowMenu }: IBurgerMenu) => {
	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.wrapper__show]: showMenu,
			})}
			onClick={closeMenu}
			role="button">
			<div
				role="menubar"
				className={cn(styles.slide, {
					[styles.slide__show]: showMenu,
				})}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.cross} onClick={closeMenu} role="button">
					<Image src={crossIcon} alt={"crossIcon"} />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};
