import { IExpensesModals } from "../../../types/common/ComponentsProps";
import Button from "../../../ui/button/button";
import Title from "../../../ui/title/Title";

import styles from "./recordDelete.module.scss";

export const RecordDeleteModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} role="textbox" className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.deleteRecordModalContainer}>
				<Title title={"Удаление записи"} />
				<p className={styles.deleteRecordModalSubtitle}>Вы действительно хотите удалить эту запись?</p>
				<p className={styles.deleteRecordModalSubtitle}>Далее действие уже не может быть отменено.</p>
				<div className={styles.buttonsContainer}>
					<Button content={"Отменить"} styleName={"buttonForDeleteRecord__cancel"} />
					<Button content={"Удалить"} styleName={"buttonForDeleteRecord"} />
				</div>
			</div>
		</dialog>
	);
};
