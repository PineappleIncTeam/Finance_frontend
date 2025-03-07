import { IExpensesModals } from "../../../types/common/ComponentsProps";

import Title from "../../../ui/title/Title";

import Button from "../../../ui/button/button";

import { ButtonType } from "../../../helpers/buttonFieldValues";

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
					<Button variant={ButtonType.Faded}>Удалить</Button>
					<Button variant={ButtonType.Faded}>В архив</Button>
					<Button variant={ButtonType.Outlined}>Отменить</Button>
				</div>
			</div>
		</dialog>
	);
};
