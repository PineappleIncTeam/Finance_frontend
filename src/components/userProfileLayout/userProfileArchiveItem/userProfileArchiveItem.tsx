import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../assets/script/privateProfileNavBar/ResetIcon";
import { IArchiveItem } from "../../../types/common/ComponentsProps";

import style from "./userProfileArchiveItem.module.scss";

export const UserProfileArchiveItem = ({ archiveItemValue, onMouseEnter, onMouseLeave }: IArchiveItem) => {
	return (
		<div className={style.archiveItem}>
			<p className={style.archiveItem__title}>{archiveItemValue}</p>
			<div className={style.archiveItemIconsWrap}>
				<DeleteIcon classNames={style.archiveItem__icon} />
				<div className={style.archiveItem__resetWrapper}>
					<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
						<ResetIcon classNames={style.archiveItem__icon} color={"var(--color-very-dark-grayish-blue)"} />
					</div>
				</div>
			</div>
		</div>
	);
};
