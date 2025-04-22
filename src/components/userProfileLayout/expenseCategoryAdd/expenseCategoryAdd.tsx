import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { IExpensesModals } from "../../../types/common/ComponentsProps";
import AppInput from "../../../ui/appInput/AppInput";

import Title from "../../../ui/title/Title";

import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/button";

import styles from "./expensesCategoryAdd.module.scss";

export const ExpenseCategoryAddModal = ({ open, addClick }: IExpensesModals) => {
	const { control, handleSubmit } = useForm<IAddCategoryExpensesForm>({
		defaultValues: {
			name: "",
			// eslint-disable-next-line camelcase
			is_income: true,
			// eslint-disable-next-line camelcase
			is_outcome: true,
		},
		mode: "all",
		delayError: 200,
	});
	const onSubmit = () => undefined;
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.addExpensesCategoryModalWrap}>
				<form className={styles.addExpensesCategoryFormContainer} onSubmit={handleSubmit(onSubmit)}>
					<Title title=" Добавление категории расходы" />
					<div className={styles.addExpensesCategoryFormData}>
						<p className={styles.addExpensesCategoryFormData__label}>Введите название категории</p>
						<AppInput
							control={control}
							label={"Введите название категории"}
							type={InputTypeList.Text}
							name={"name"}
							placeholder={"Название категории"}
							subtitle="Не более 14 символов"
						/>
					</div>
					<div className={styles.buttonsContainer}>
						<Button variant={ButtonType.Outlined}>Отменить</Button>
						<Button variant={ButtonType.Contained} onClick={addClick}>
							Добавить
						</Button>
					</div>
				</form>
			</div>
		</dialog>
	);
};
