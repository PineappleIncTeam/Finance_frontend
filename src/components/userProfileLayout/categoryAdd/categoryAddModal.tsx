import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { IExpensesModals } from "../../../types/common/ComponentsProps";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";
import AppInput from "../../../ui/appInput/AppInput";

import Title from "../../../ui/title/Title";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/button";

import { formHelpers } from "../../../utils/formHelpers";

import styles from "./categoryAddModal.module.scss";

export const CategoryAddModal = ({ open, request, onCancelClick }: IExpensesModals) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddCategoryExpensesForm>({
		defaultValues: {
			name: "",
			// eslint-disable-next-line camelcase
			is_income: false,
			// eslint-disable-next-line camelcase
			is_outcome: true,
			// amount: "",
		},
		mode: "all",
		delayError: 200,
	});

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.addCategoryModalWrap}>
				<form className={styles.addCategoryFormContainer} onSubmit={handleSubmit(request)}>
					<Title title={"Добавление категории"} />
					<div className={styles.addCategoryFormData}>
						<p className={styles.addCategoryFormData__label}>Введите название категории</p>
						<AppInput
							control={control}
							label={"Введите название категории"}
							name={"name"}
							type={InputTypeList.Text}
							placeholder={"Название категории"}
							subtitle="Не более 14 символов"
							error={formHelpers.getAddCategoryError(errors)}
						/>
					</div>
					{/* <div className={styles.addCategoryFormData}>
						<p className={styles.addCategoryFormData__label}>Введите сумму</p>
						<AppInput
							control={control}
							label={"Введите сумму"}
							type={InputTypeList.Text}
							name={"amount"}
							placeholder={"0.00"}
						/>
					</div> */}
					<div className={styles.buttonsContainer}>
						<Button variant={ButtonType.Outlined} onClick={() => onCancelClick()}>
							Отменить
						</Button>
						<Button variant={ButtonType.Contained} type={InputTypeList.Submit}>
							Добавить
						</Button>
					</div>
				</form>
			</div>
		</dialog>
	);
};
