import { useState } from "react";
import { useForm } from "react-hook-form";

import { IEditTransactionForm } from "../../../types/components/ComponentsTypes";
import { IEditTransaction } from "../../../types/common/ComponentsProps";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/Button/Button";
import Title from "../../../ui/title/Title";
import { ResponseApiRequestModal } from "../../../ui/responseActionModal/responseApiRequestModal";
import { InputTypeList } from "../../../helpers/Input";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./editTransaction.module.scss";

export const EditTransactionModal = ({ open, id, request, cancelEdit }: IEditTransaction) => {
	const [isNegativeBalanceModalOpen, setIsNegativeBalanceModalOpen] = useState<boolean>(false);

	const { control, handleSubmit } = useForm<IEditTransactionForm>({
		defaultValues: {
			amount: 0,
		},
		mode: "all",
		delayError: 200,
	});

	const interval = 2000;

	const onSubmit = async (data: IEditTransactionForm) => {
		if (id !== null && data !== null) {
			if (data.amount === 0 || data.amount < 0) {
				setIsNegativeBalanceModalOpen(true);
				setTimeout(() => setIsNegativeBalanceModalOpen(false), interval);
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
			<ResponseApiRequestModal
				open={isNegativeBalanceModalOpen}
				title="Баланс не может быть меньше нуля"
				className={styles.modalContainer}
			/>
		</>
	);
};
