import Image from "next/image";

import cn from "classnames";

import crossIcon from "../../../assets/components/userProfile/crossIcon.svg";
import { IBurgerMenu } from "../../../types/components/ComponentsTypes";

import { useLockScroll } from "../../../hooks/useLockScroll";

import style from "./burgerMenu.module.scss";

export const BurgerMenu = ({ children, showMenu, setShowMenu }: IBurgerMenu) => {
	const closeMenu = () => {
		setShowMenu(false);
	};

	useLockScroll(showMenu);

	return (
		<div
			className={cn(style.burgerMenuWrapper, {
				[style.burgerMenuWrapper__show]: showMenu,
			})}>
			<div
				className={cn(style.wrapper, {
					[style.wrapper__show]: showMenu,
				})}
				onClick={closeMenu}
				role="button"></div>
			<div
				role="menubar"
				className={cn(style.slide, {
					[style.slide__show]: showMenu,
				})}>
				<div className={style.cross} onClick={closeMenu} role="button">
					<Image src={crossIcon} alt={"crossIcon"} className={style.cross__icon} />
				</div>
				<div className={style.content}>{children}</div>
			</div>
		</div>
	);
};
