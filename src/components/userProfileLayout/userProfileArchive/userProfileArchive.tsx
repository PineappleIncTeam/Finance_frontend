import { useEffect, useRef, useState } from "react";

import { IHandleMouseEnterArchiveItem } from "../../../types/common/ComponentsProps";
import { SimpleTooltip } from "../simpleTooltip/simpleTooltip";
import { UserProfileArchiveItem } from "../userProfileArchiveItem/userProfileArchiveItem";

import { archiveList } from "../../../mocks/PrivateProfileArchive";

import styles from "./userProfileArchive.module.scss";

export const UserProfileArchive = () => {
	const tooltipInitialState = {
		show: false,
		content: "",
		top: 0,
		left: 0,
	};

	const [tooltip, setTooltip] = useState(tooltipInitialState);
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
	const scrollableBlockRef = useRef<HTMLDivElement>(null);

	const MOBILE_SCREEN_SIZE = 1100;
	const TOOLTIP_OFFSET_LEFT = 100;
	const TOOLTIP_OFFSET_TOP = 40;

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= MOBILE_SCREEN_SIZE);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [MOBILE_SCREEN_SIZE]);

	const handleMouseEnter: IHandleMouseEnterArchiveItem = (event, content) => {
		const target = event.currentTarget as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const scrollableBlock = scrollableBlockRef.current;

		if (!scrollableBlock) return;

		const scrollableBlockRect = scrollableBlock.getBoundingClientRect();

		const top = rect.top - scrollableBlockRect.top - TOOLTIP_OFFSET_TOP;
		let left = rect.left - scrollableBlockRect.left;

		if (left + TOOLTIP_OFFSET_LEFT > scrollableBlockRect.width) {
			left = scrollableBlockRect.width - TOOLTIP_OFFSET_LEFT;
		}

		setTooltip({
			show: true,
			content,
			top,
			left,
		});
	};

	const handleMouseLeave = () => {
		setTooltip({ show: false, content: "", top: 0, left: 0 });
	};

	return (
		<div className={styles.archiveForm}>
			<p className={styles.archiveTitle}>Архив</p>
			<div className={styles.archiveItemsWrapper}>
				<div className={styles.archive__items} ref={scrollableBlockRef}>
					{archiveList.map((archiveItemValue, index) => {
						return (
							<UserProfileArchiveItem
								archiveItemValue={archiveItemValue}
								key={index}
								onMouseEnter={isSmallScreen ? undefined : (e) => handleMouseEnter(e, "Восстановить")}
								onMouseLeave={isSmallScreen ? undefined : handleMouseLeave}
							/>
						);
					})}
				</div>
				<SimpleTooltip
					open={tooltip.show}
					text={tooltip.content}
					top={tooltip.top}
					left={tooltip.left}
					className={styles.archiveItem__tooltip || ""}
				/>
			</div>
		</div>
	);
};
