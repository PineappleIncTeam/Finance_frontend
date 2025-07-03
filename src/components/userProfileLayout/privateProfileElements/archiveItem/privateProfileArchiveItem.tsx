import { DeleteIcon } from "../../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../../assets/script/privateProfileNavBar/ResetIcon";
import { IArchiveItem } from "../../../../types/common/ComponentsProps";

import styles from "./privateProfileArchiveItem1.module.scss";

export const PrivateProfileArchiveItem = ({ archiveItemValue, onMouseEnter, onMouseLeave }: IArchiveItem) => {
	return (
		<div className={styles.archiveItemWrapper}>
			<p className={styles.archiveItemWrapper__title}>{archiveItemValue}</p>
			<div className={styles.archiveItemIconsWrap}>
				<DeleteIcon classNames={styles.archiveItemIconsWrap__iconElement} />
				<div className={styles.archiveItemResetWrapper}>
					<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
						<ResetIcon
							classNames={styles.archiveItemIconsWrap__iconElement}
							color={"var(--color-very-dark-grayish-blue)"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
