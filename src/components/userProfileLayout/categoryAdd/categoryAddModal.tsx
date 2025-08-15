import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { IAddCategory } from "../../../types/common/ComponentsProps";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";
import AppInput from "../../../ui/appInput/AppInput";

import Title from "../../../ui/title/Title";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/Button1";

import { formHelpers } from "../../../utils/formHelpers";
import { financePattern } from "../../../helpers/authConstants";
import { CategoryType } from "../../../helpers/categoryTypes";

import styles from "./categoryAddModal.module.scss";

export const CategoryAddModal = ({ open, request, onCancelClick, type }: IAddCategory) => {
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
			is_outcome: false,
		},
		mode: "all",
		delayError: 200,
	});

	const onSubmit = async (data: IAddCategoryExpensesForm) => {
		console.log(data);
		console.log(type);
		if (data !== null) {
			// eslint-disable-next-line camelcase
			data.is_income = type === CategoryType.Income ? true : false;
			// eslint-disable-next-line camelcase
			data.is_outcome = type === CategoryType.Outcome ? true : false;
			console.log(data);
			await request(data);
		}
	};

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.addCategoryModalWrap}>
				<form className={styles.addCategoryFormContainer} onSubmit={handleSubmit(onSubmit)}>
					<Title title={"Добавление категории"} />
					<div className={styles.addCategoryFormData}>
						<AppInput
							control={control}
							label={"Введите название категории"}
							name={"name"}
							type={InputTypeList.Text}
							placeholder={"Название категории"}
							subtitle="Не более 14 символов"
							error={formHelpers.getAddCategoryError(errors)}
							rules={{ required: true, pattern: financePattern }}
						/>
					</div>
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
