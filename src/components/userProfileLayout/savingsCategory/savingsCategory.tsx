import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { ISavingsCategory } from "../../../types/common/ComponentsProps";
import AppInput from "../../../ui/appInput/AppInput";
import Title from "../../../ui/title/Title";
import { ISavingsTargetAddForm } from "../../../types/pages/Savings";
import Button from "../../../ui/Button/Button1";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./savingsCategory.module.scss";

export const SavingsAddTargetModal = ({ open, request, onCancelClick }: ISavingsCategory) => {
	const { control, handleSubmit } = useForm<ISavingsTargetAddForm>({
		defaultValues: {
			name: "",
			id: null,
			amount: 0,
		},
		mode: "all",
		delayError: 200,
	});

	const onSubmit = async (data: ISavingsTargetAddForm) => {
		if (data !== null) {
			await request(data);
		}
	};
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.addCategoryModalWrap}>
				<form className={styles.addCategoryFormContainer} onSubmit={handleSubmit(onSubmit)}>
					<Title title={"Добавление категории накопления"} />
					<div className={styles.addCategoryFormData}>
						<AppInput
							control={control}
							label={"Введите название категории"}
							name={"name"}
							type={InputTypeList.Text}
							placeholder={"Название категории"}
							subtitle="Не более 14 символов"
						/>
					</div>
					<div className={styles.addCategoryFormData}>
						<AppInput
							control={control}
							label={"Введите целевую сумму"}
							type={InputTypeList.Text}
							name={"amount"}
							placeholder={"0.00"}
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
