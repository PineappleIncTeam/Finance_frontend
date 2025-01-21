import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../assets/script/privateProfileNavBar/ResetIcon";
import { archiveList } from "../../../mocks/PrivateProfileArchive";
import { SimpleTooltip } from "../simpleTooltip/simpleTooltip";

import { IArchiveItem } from "../../../types/common/ComponentsProps";

import style from "./userProfileArchive.module.scss";

const ArchiveItem = ({ archiveItemValue }: IArchiveItem) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);
	return (
		<div className={style.archiveItem}>
			<p className={style.archiveItem__title}>{archiveItemValue}</p>
			<div className={style.archiveItemIconsWrap}>
				<DeleteIcon classNames={style.archiveItem__icon} />
				<div className={style.resetWrapper}>
					<div onMouseOver={() => setIsTooltipShown(true)} onMouseLeave={() => setIsTooltipShown(false)}>
						<ResetIcon classNames={style.archiveItem__icon} color={"var(--color-very-dark-grayish-blue)"} />
					</div>
					<SimpleTooltip open={isTooltipShown} text={"Восстановить"} className={style.archiveItem__tooltip} />
				</div>
			</div>
		</div>
	);
};

export const Archive = () => {
	return (
		<div className={style.archiveForm}>
			<p className={style.archiveTitle}>Архив</p>
			<div className={style.archive__items}>
				{archiveList.map((archiveItemValue, index) => {
					return <ArchiveItem archiveItemValue={archiveItemValue} key={index} />;
				})}
			</div>
		</div>
	);
};
