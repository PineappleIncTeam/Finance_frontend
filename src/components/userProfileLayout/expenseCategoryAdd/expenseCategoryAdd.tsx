import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { IExpensesModals } from "../../../types/common/ComponentsProps";
import AppInput from "../../../ui/appInput/AppInput";

import Title from "../../../ui/title/Title";

import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/button/button";

import styles from "./expensesCategoryAdd.module.scss";

export const ExpenseCategoryAddModal = ({ open }: IExpensesModals) => {
	const { control, handleSubmit } = useForm<IAddCategoryExpensesForm>({
		defaultValues: {
			category: "",
			amount: "",
			targetAmount: "",
		},
		mode: "all",
		delayError: 200,
	});
	const onSubmit = () => {
		console.log("submit");
	};
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
							name={"category"}
							placeholder={"Название категории"}
							subtitle="Не более 14 символов"
						/>
					</div>
					<div className={styles.addExpensesCategoryFormData}>
						<p className={styles.addExpensesCategoryFormData__label}>Введите сумму</p>
						<AppInput
							control={control}
							label={"Введите сумму"}
							type={InputTypeList.Text}
							name={"amount"}
							placeholder={"0.00"}
						/>
					</div>
					<div className={styles.addExpensesCategoryFormData}>
						<p className={styles.addExpensesCategoryFormData__label}>Введите целевую сумму</p>
						<AppInput
							control={control}
							label={"Введите целевую сумму"}
							type={InputTypeList.Text}
							name={"targetAmount"}
							placeholder={"0.00"}
						/>
					</div>
					<div className={styles.buttonsContainer}>
						<Button content={"Отменить"} styleName={"buttonForAddExpensesCategory__cancel"} />
						<Button content={"Добавить"} styleName={"buttonForAddExpensesCategory"} />
					</div>
				</form>
			</div>
		</dialog>
	);
};
