import { IExpensesModals } from "../../../types/common/ComponentsProps";

import styles from "./categoryAddSuccess.module.scss";

export const CategoryAddSuccessModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.categoryAddSuccessModalContainer}>
				<p className={styles.categoryAddSuccessModalContainer__title}>Категория успешно добавлена</p>
			</div>
		</dialog>
	);
};
