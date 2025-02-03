import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../assets/script/privateProfileNavBar/ResetIcon";
import { IArchiveItem } from "../../../types/common/ComponentsProps";

import styles from "./userProfileArchiveItem.module.scss";

export const UserProfileArchiveItem = ({ archiveItemValue, onMouseEnter, onMouseLeave }: IArchiveItem) => {
	return (
		<div className={styles.archiveItem}>
			<p className={styles.archiveItem__title}>{archiveItemValue}</p>
			<div className={styles.archiveItemIconsWrap}>
				<DeleteIcon classNames={styles.archiveItem__icon} />
				<div className={styles.archiveItem__resetWrapper}>
					<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
						<ResetIcon classNames={styles.archiveItem__icon} color={"var(--color-very-dark-grayish-blue)"} />
					</div>
				</div>
			</div>
		</div>
	);
};
