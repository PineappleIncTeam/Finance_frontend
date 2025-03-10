import axios from "axios";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";
import { IExpensesModals } from "../../../types/common/ComponentsProps";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";
import AppInput from "../../../ui/appInput/AppInput";

import Title from "../../../ui/title/Title";

import { ButtonType } from "../../../helpers/buttonFieldValues";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import { AddExpensesCategory } from "../../../services/api/userProfile/AddExpensesCategory";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { CategoryAddSuccessModal } from "../categoryAddSuccess/categoryAddSuccess";

import Button from "../../../ui/Button/button";

import styles from "./categoryAddModal.module.scss";

export const CategoryAddModal = ({ open }: IExpensesModals) => {
	const { control, handleSubmit } = useForm<IAddCategoryExpensesForm>({
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

	const [baseUrl, setBaseUrl] = useState<string>();
	const [isResponseSuccess, setIsResponseSuccess] = useState<boolean>(false);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const onSubmit = async (data: IAddCategoryExpensesForm) => {
		console.log(JSON.stringify(data));
		try {
			if (baseUrl) {
				const response = await AddExpensesCategory(baseUrl, data);

				if (response.status === axios.HttpStatusCode.Ok) {
					console.log(response);
					setIsResponseSuccess(true);
					return response;
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.BadRequest &&
				error.response.status <= axios.HttpStatusCode.InternalServerError
			) {
				console.log(error);
				return null;
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				console.log(error);
				return null;
			}
		}
	};

	return (
		<>
			<dialog open={open} className={styles.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.addCategoryModalWrap}>
					<form className={styles.addCategoryFormContainer} onSubmit={handleSubmit(onSubmit)}>
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
							<Button variant={ButtonType.Outlined}>Отменить</Button>
							<Button variant={ButtonType.Contained} type={InputTypeList.Submit}>
								Добавить
							</Button>
						</div>
					</form>
				</div>
			</dialog>
			{isResponseSuccess && <CategoryAddSuccessModal open={isResponseSuccess} />}
		</>
	);
};
