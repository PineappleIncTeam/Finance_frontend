import styles from "./CategorySelectAdd.module.scss";

const CategorySelectAdd = () => {
	return (
		<>
			<div className={styles.formAdd}>
				<div className={styles.formContent}>
					<h2 className={styles.formContent__title}>Добавление категории накоплений</h2>
					<div className={styles.formContent__input}>
						<label htmlFor="CategoryName">Введите название категории</label>
						<input type="text" placeholder="Название категории" maxLength={14} required />
					</div>
					<div className={styles.formContent__input}>
						<label htmlFor="CategorySum">Введите целевую сумму</label>
						<input type="text" placeholder="0.00" required />
					</div>
					<div className={styles.formContent__btn}>
						<button className={styles.btnCancel}>Отменить</button>
						<button className={styles.btnAdd}>Добавить</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategorySelectAdd;
