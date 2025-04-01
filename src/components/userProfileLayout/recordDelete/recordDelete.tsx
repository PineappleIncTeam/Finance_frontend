import { ButtonType } from "../../../helpers/buttonFieldValues";
import { ITransactionDelete } from "../../../types/common/ComponentsProps";
import Button from "../../../ui/Button/button";
import Title from "../../../ui/title/Title";

import styles from "./recordDelete.module.scss";

export const RecordDeleteModal = ({ open, remove, cancelRemove }: ITransactionDelete) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.deleteRecordModalContainer}>
				<Title title={"Удаление записи"} />
				<p className={styles.deleteRecordModalSubtitle}>Вы действительно хотите удалить эту запись?</p>
				<p className={styles.deleteRecordModalSubtitle}>Далее действие уже не может быть отменено.</p>
				<div className={styles.buttonsContainer}>
					<Button variant={ButtonType.Outlined} onClick={() => cancelRemove()}>
						Отменить
					</Button>
					<Button variant={ButtonType.Faded} onClick={() => remove()}>
						Удалить
					</Button>
				</div>
			</div>
		</dialog>
	);
};
