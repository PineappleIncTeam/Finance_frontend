import { IExpensesModals } from "../../../../types/common/ComponentsProps";

import styles from "./successDelete.module.scss";

export const SuccessDeleteModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.successDeleteModalContainer}>
				<p className={styles.successDeleteModalContainer__title}>Запись успешно удалена</p>
			</div>
		</dialog>
	);
};
