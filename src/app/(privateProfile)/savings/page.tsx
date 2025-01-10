"use client";
import { useForm } from "react-hook-form";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import AppInput from "../../../ui/appInput/AppInput";
import { InputTypeList } from "../../../helpers/Input";
import { ISavingsInputForm } from "../../../types/pages/Savings";
import { Select } from "../../../ui/select/Select";
import Button from "../../../ui/button/button";

import style from "./savings.module.scss";

function Savings() {
	const { control } = useForm<ISavingsInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	return (
		<div className={style.savingsPageWrap}>
			<div className={style.savingsPageContainer}>
				<form className={style.savingsFormContentWrapper}>
					<h1 className={style.headerTitle}>Накопления</h1>
					<div className={style.savingsByDateConteiner}>
						<div className={style.totalAmountWrapper}>
							<p className={style.totalAmountWrapper__savings}>Общая сумма накоплений </p>
							<p className={style.totalAmountWrapper__sum}>4 112 500 ₽</p>
						</div>
						<div className={style.dateSelectionWrapper}>
							<p className={style.dateSelectionWrapper__description}>Выбор даты</p>
							<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
						</div>
					</div>
					<div className={style.savingsDetailsContainer}>
						<div className={style.savingsDetailsContainer__category}>
							<Select
								name={"expenses"}
								label={"Накопления"}
								options={["Обучение ребенка", "Машина", "Квартира", "Отпуск 2024"]}
							/>
						</div>
						<div className={style.savingsDetailsContainer__sum}>
							<AppInput
								control={control}
								label={"Сумма"}
								type={InputTypeList.Number}
								name={"number"}
								placeholder={"0.00 ₽"}
							/>
						</div>

						{/* styleName переделать! */}

						<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
							<PlusIcon classNames={style.addButtonIcon} />
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Savings;
