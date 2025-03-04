import { IExpensesModals } from "../../../../types/common/ComponentsProps";

import styles from "./categoryInArchiveSuccess.module.scss";

export const CategoryInArchiveSuccessModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} role="textbox" className={styles.backgroundModal}>
			<div
				onClick={(e) => e.stopPropagation()}
				role="textbox"
				className={styles.categoryInArchiveSuccessModalContainer}>
				<p className={styles.categoryInArchiveSuccessModalTitle}>Категория успешно перенесена в &quot;Архив&quot;</p>
			</div>
		</dialog>
	);
};
