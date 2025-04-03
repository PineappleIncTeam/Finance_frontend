import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputTypeList } from "../../../helpers/Input";

import AppInput from "../../../ui/appInput/AppInput";

import { IEditTransactionForm } from "../../../types/components/ComponentsTypes";
import { IEditTransaction } from "../../../types/common/ComponentsProps";

import { ButtonType } from "../../../helpers/buttonFieldValues";

import Button from "../../../ui/Button/button";
import Title from "../../../ui/title/Title";

import { NegativeBalanceModal } from "../recordDeleteResponse/negativeBalance/negativeBalance";

import styles from "./editTransaction.module.scss";

export const EditTransactionModal = ({ open, id, request, cancelEdit }: IEditTransaction) => {
	const { control, handleSubmit } = useForm<IEditTransactionForm>({
		defaultValues: {
			amount: 0,
		},
		mode: "all",
		delayError: 200,
	});

	const [isNegativeBalanceModalShown, setIsNegativeBalanceModalShown] = useState<boolean>(false);
	const interval = 2000;

	const onSubmit = async (data: IEditTransactionForm) => {
		if (id !== null && data !== null) {
			if (data.amount === 0 || data.amount < 0) {
				setIsNegativeBalanceModalShown(true);
				setTimeout(() => setIsNegativeBalanceModalShown(false), interval);
				return;
			}
			await request(id, data);
		}
	};

	return (
		<>
			<dialog open={open} className={styles.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.changeAmountModalContainer}>
					<form className={styles.changeAmountModalContainer__form} onSubmit={handleSubmit(onSubmit)}>
						<Title title={"Изменение суммы"} />
						<div className={styles.changeAmountFormData}>
							<p className={styles.changeAmountFormData__label}>Введите новое числовое значение</p>
							<AppInput
								control={control}
								label={"Введите новое числовое значение"}
								name={"amount"}
								type={InputTypeList.Number}
								placeholder={"100.00"}
							/>
						</div>
						<div className={styles.buttonsContainer}>
							<Button variant={ButtonType.Outlined} onClick={() => cancelEdit()}>
								Отменить
							</Button>
							<Button variant={ButtonType.Faded} type={InputTypeList.Submit}>
								Изменить
							</Button>
						</div>
					</form>
				</div>
			</dialog>
			{isNegativeBalanceModalShown && <NegativeBalanceModal open={isNegativeBalanceModalShown} />}
		</>
	);
};
