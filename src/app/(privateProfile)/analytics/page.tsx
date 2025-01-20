"use client";

import { useForm } from "react-hook-form";

import AppInput from "../../../ui/appInput/AppInput";
import { Select } from "../../../ui/select/Select";
import { IExpensesInputForm } from "../../../types/pages/Expenses";
import { InputTypeList } from "../../../helpers/Input";

import styles from "./analytics.module.scss";

function Analytics() {

	const { control } = useForm<IExpensesInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	return (
		<div className={styles.analyticsPageWrap}>

			<div className={styles.analyticsPageContainer}>

				<h1 className={styles.headerTitle}>Аналитика</h1>

				<div className={styles.analyticsSelectContainer}>
					<div className={styles.analyticsSelectOperation}>
						<Select name={"expenses"} label={"Операции"} options={["Расходы", "Доходы"]} />
					</div>
					<div className={styles.analyticsSelectDateAndPeriod}>
						<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
					</div>
				</div>

				<div className={styles.analyticsDisplayWrapper}>
					<p className={styles.analyticsDisplay_title}>Отображать в:</p>
					<div className={styles.analyticsDisplay}>
						<input
							name="value"
							type="radio"
							id="analyticsDisplay__rub"
							className={styles.analyticsDisplay__input}
							defaultChecked
						/>
						<label htmlFor="analyticsDisplay__rub" className={styles.analyticsDisplay__label}>
							<p className={styles.analyticsDisplay__text}>В рублях</p>
						</label>
						<input
							name="value"
							type="radio"
							id="analyticsDisplay__percent"
							className={styles.analyticsDisplay__input}
						/>
						<label htmlFor="analyticsDisplay__percent" className={styles.analyticsDisplay__label}>
							<p className={styles.analyticsDisplay__text}>В процентах</p>
						</label>
					</div>
				</div>

				<div className={styles.analyticsDiagramWrapper}>

					<div className={styles.analyticsDiagramInfo}>
						<p>Общий расход</p>
						<p>130 000.75 ₽</p>
						<p>14.09.23 - 20.09.23</p>
					</div>

					<div className={styles.analyticsDiagram}>

						<div className={styles.diagram}>

						</div>

						<div>

						</div>

					</div>

				</div>

			</div>

		</div>
	);
}

export default Analytics;
