import { ICategoryDeleteModal } from "../../../types/common/ComponentsProps";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/button";
import Title from "../../../ui/title/Title";

import styles from "./categoryDelete.module.scss";

export const CategoryDeleteModal = ({
	open,
	category,
	onCancelClick,
	id,
	requestDeleteApi,
	requestArchiveApi,
	checkCategoryForOperation,
}: ICategoryDeleteModal) => {
	const onArchiveClick = () => {
		if (id !== null) {
			const data = {
				// eslint-disable-next-line camelcase
				is_deleted: true,
			};
			requestArchiveApi(id, data);
		}
	};

	const onRemoveClick = () => {
		if (id !== null && category !== null) {
			checkCategoryForOperation(+id) ? onArchiveClick() : requestDeleteApi(id, category);
		}
	};

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.deleteCategoryModalContainer}>
				<Title title={"Удаление категории"} />
				<p className={styles.deleteCategoryModalContainer__subtitle}>
					Вы хотите удалить категорию {category} или оправить ее в архив ?
				</p>
				<div className={styles.buttonsContainer}>
					<Button variant={ButtonType.Faded} onClick={() => onRemoveClick()}>
						Удалить
					</Button>
					<Button variant={ButtonType.Faded} onClick={() => onArchiveClick()}>
						В архив
					</Button>
					<Button variant={ButtonType.Outlined} onClick={() => onCancelClick()}>
						Отменить
					</Button>
				</div>
			</div>
		</dialog>
	);
};
