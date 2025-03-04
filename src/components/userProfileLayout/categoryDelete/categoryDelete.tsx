import { IExpensesModals } from "../../../types/common/ComponentsProps";

import Title from "../../../ui/title/Title";

import Button from "../../../ui/button/button";

import styles from "./categoryDelete.module.scss";

export const CategoryDeleteModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.deleteCategoryModalContainer}>
				<Title title={"Удаление категории"} />
				<p className={styles.deleteCategoryModalContainer__subtitle}>
					Вы хотите удалить категорию «Зарплата» или оправить ее в архив ?
				</p>
				<div className={styles.buttonsContainer}>
					<Button content={"Удалить"} styleName={"buttonForDeleteCategory"} />
					<Button content={"В архив"} styleName={"buttonForDeleteCategory__archive"} />
					<Button content={"Отменить"} styleName={"buttonForDeleteCategory__cancel"} />
				</div>
			</div>
		</dialog>
	);
};
