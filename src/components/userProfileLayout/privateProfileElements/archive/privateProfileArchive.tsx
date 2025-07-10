import { useEffect, useRef, useState } from "react";

import { PrivateProfileArchiveItem } from "../archiveItem/privateProfileArchiveItem";
import { IHandleMouseEnterArchiveItem } from "../../../../types/common/ComponentsProps";
import { SimpleTooltip } from "../../simpleTooltip/simpleTooltip";

import { archiveList } from "../../../../mocks/PrivateProfileArchive";

import styles from "./privateProfileArchive.module.scss";

export const PrivateProfileArchive = () => {
	const tooltipInitialState = {
		show: false,
		content: "",
		top: 0,
		left: 0,
	};

	const [tooltip, setTooltip] = useState(tooltipInitialState);
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
	const scrollableBlockRef = useRef<HTMLDivElement>(null);

	const laptopScreenSizeValue = 1100;
	const tooltipOffsetLeft = 100;
	const tooltipOffsetTop = 40;

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= laptopScreenSizeValue);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [laptopScreenSizeValue]);

	const handleMouseEnter: IHandleMouseEnterArchiveItem = (event, content) => {
		const target = event.currentTarget as HTMLDivElement;
		const rect = target.getBoundingClientRect();
		const scrollableBlock = scrollableBlockRef.current;

		if (!scrollableBlock) return;

		const scrollableBlockRect = scrollableBlock.getBoundingClientRect();

		const top = rect.top - scrollableBlockRect.top - tooltipOffsetTop;
		let left = rect.left - scrollableBlockRect.left;

		if (left + tooltipOffsetLeft > scrollableBlockRect.width) {
			left = scrollableBlockRect.width - tooltipOffsetLeft;
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
			<p className={styles.archiveForm__title}>Архив</p>
			<div className={styles.archiveItemsWrapper}>
				<div className={styles.archiveItemsContainer} ref={scrollableBlockRef}>
					{archiveList.map((archiveItemValue, index) => {
						return (
							<PrivateProfileArchiveItem
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
