import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";

import AppInput from "../../../ui/appInput/AppInput";

import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";
import { IExpensesModals } from "../../../types/common/ComponentsProps";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/button";
import Title from "../../../ui/title/Title";

import styles from "./amountChange.module.scss";

export const AmountChangeModal = ({ open }: IExpensesModals) => {
	const { control, handleSubmit } = useForm<IAddCategoryExpensesForm>({
		// defaultValues: {
		// 	amount: "",
		// },
		mode: "all",
		delayError: 200,
	});

	const onSubmit = () => {
		console.log("submit");
	};

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.changeAmountModalContainer}>
				<form className={styles.changeAmountModalContainer__form} onSubmit={handleSubmit(onSubmit)}>
					<Title title={"Изменение суммы"} />
					<div className={styles.changeAmountFormData}>
						<p className={styles.changeAmountFormData__label}>Введите новое числовое значение</p>
						<AppInput
							control={control}
							label={"Введите новое числовое значение"}
							name={"name"}
							type={InputTypeList.Text}
							placeholder={"100.00"}
						/>
					</div>
					<div className={styles.buttonsContainer}>
						<Button variant={ButtonType.Outlined}>Отменить</Button>
						<Button variant={ButtonType.Faded}>Изменить</Button>
					</div>
				</form>
			</div>
		</dialog>
	);
};
