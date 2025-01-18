import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../assets/script/privateProfileNavBar/ResetIcon";
import { archiveList } from "../../../mocks/PrivateProfileArchive";
import { Tooltip } from "../tooltip/tooltip";

import style from "./userProfileArchive.module.scss";

const ArchiveItem = ({ value }: { value: string }) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);
	return (
		<div className={style.archiveItem}>
			<p className={style.archiveItem__title}>{value}</p>
			<div className={style.archiveItem__icons}>
				<DeleteIcon classNames={style.archiveItem__icon} />
				<div
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}
					className={style.resetWrapper}>
					<ResetIcon classNames={style.archiveItem__icon} color={"var(--color-very-dark-grayish-blue)"} />
					<Tooltip open={isTooltipShown} text={"Восстановить"} />
				</div>
			</div>
		</div>
	);
};

export const Archive = () => {
	return (
		<div className={style.form}>
			<div className={style.title}>Архив</div>
			<div className={style.archive__items}>
				{archiveList.map((el, index) => {
					return <ArchiveItem value={el} key={index} />;
				})}
			</div>
		</div>
	);
};
