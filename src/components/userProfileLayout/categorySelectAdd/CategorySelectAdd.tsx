import { useState } from "react";


import { ICategorySelectAdd } from "../../../types/common/ComponentsProps";

import styles from "./CategorySelectAdd.module.scss";

const CategorySelectAdd = ({ onSubmit, onClose }: ICategorySelectAdd) => {

    const [categoryName, setCategoryName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");

    const handleSubmit = () => {

        onSubmit(categoryName, targetAmount);
        onClose(); 
    };





	return (
		<>
			<div className={styles.formAdd}>
				<div className={styles.formContent}>
					<h2 className={styles.formContent__title}>Добавление категории накоплений</h2>
					<div className={styles.formContent__input}>
						<label htmlFor="CategoryName">Введите название категории</label>
						<input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Название категории" maxLength={14} required />
					</div>
					<div className={styles.formContent__input}>
						<label htmlFor="CategorySum">Введите целевую сумму</label>
						<input type="text" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="0.00" required />
					</div>
					<div className={styles.formContent__btn}>
						<button className={styles.btnCancel} onClick={onClose}>Отменить</button>
						<button className={styles.btnAdd} onClick={handleSubmit}>Добавить</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategorySelectAdd;
