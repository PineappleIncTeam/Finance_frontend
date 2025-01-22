import { useRef, useState } from "react";

import { archiveList } from "../../../mocks/PrivateProfileArchive";
import { SimpleTooltip } from "../simpleTooltip/simpleTooltip";
import { ArchiveItem } from "../userProfileArchiveItem/userProfileArchiveItem";

import { IHandleMouseEnterArchiveItem } from "../../../types/common/ComponentsProps";

import style from "./userProfileArchive.module.scss";

export const Archive = () => {
	const [tooltip, setTooltip] = useState({
		show: false,
		content: "",
		top: 0,
		left: 0,
	});

	const scrollableBlockRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter: IHandleMouseEnterArchiveItem = (event, content) => {
		const TOOLTIP_OFFSET_LEFT = 100;
		const TOOLTIP_OFFSET_TOP = 40;

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
		<div className={style.archiveForm}>
			<p className={style.archiveTitle}>Архив</p>
			<div className={style.archiveItemsWrapper}>
				<div className={style.archive__items} ref={scrollableBlockRef}>
					{archiveList.map((archiveItemValue, index) => {
						return (
							<ArchiveItem
								archiveItemValue={archiveItemValue}
								key={index}
								onMouseEnter={(e) => handleMouseEnter(e, "Восстановить")}
								onMouseLeave={handleMouseLeave}
							/>
						);
					})}
				</div>

				<SimpleTooltip
					open={tooltip.show}
					text={tooltip.content}
					top={tooltip.top}
					left={tooltip.left}
					className={style.archiveItem__tooltip || ""}
				/>
			</div>
		</div>
	);
};
