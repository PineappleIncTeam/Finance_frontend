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

	// Place it in a separate file and should be generated based on user input
	const DIAGRAM_ITEMS_DATA = [
		{
			id: 1,
			background: "--color-dark-spring-green",
			title: "Внезапная покупка",
			value: "1.00 %"
		},
		{
			id: 2,
			background: "--color-lavender-blush",
			title: "Стрижка",
			value: "3.00 %"
		},
		{
			id: 3,
			background: "--color-sage-green",
			title: "Бассейн",
			value: "2.50 %"
		},
		{
			id: 4,
			background: "--color-light-peach",
			title: "Школа",
			value: "1.26 %"
		},
		{
			id: 5,
			background: "--color-burnt-orange",
			title: "Еда",
			value: "2.04 %"
		},
		{
			id: 6,
			background: "--color-soft-tan",
			title: "Плата жилья",
			value: "11.70 %"
		},
		{
			id: 7,
			background: "--color-peach",
			title: "Ногти",
			value: "0.30 %"
		},
		{
			id: 8,
			background: "--color-dark-sea-green",
			title: "Бензин",
			value: "0.75 %"
		},
		{
			id: 9,
			background: "--color-dusty-rose",
			title: "Дорога работа",
			value: "1.03 %"
		},
		{
			id: 10,
			background: "--color-steel-blue",
			title: "Юрист",
			value: "7.00 %"
		},
		{
			id: 11,
			background: "--color-sunny-yellow",
			title: "Детский сад",
			value: "12.40 %"
		},
		{
			id: 12,
			background: "--color-peach-pink",
			title: "Учебники",
			value: "2.00 %"
		},
		{
			id: 13,
			background: "--color-forest-green",
			title: "Отпуск",
			value: "4.95 %"
		},
		{
			id: 14,
			background: "--color-olive-green",
			title: "Театр",
			value: "1.30 %"
		},
		{
			id: 15,
			background: "--color-pale-lemon",
			title: "Кредит",
			value: "20.00 %"
		},
		{
			id: 16,
			background: "--color-dark-olive",
			title: "Страховка",
			value: "0.40 %"
		},
		{
			id: 17,
			background: "--color-golden-olive",
			title: "Киберспорт",
			value: "0.40 %"
		},
		{
			id: 18,
			background: "--color-light-blue-gray",
			title: "Путешествия",
			value: "0.40 %"
		},
		{
			id: 19,
			background: "--color-burnt-orange",
			title: "Кино",
			value: "0.40 %"
		},
		{
			id: 20,
			background: "--color-bright-lime",
			title: "Ипотека",
			value: "7.37 %"
		}
	]

	return (
		<div className={styles.analyticsPageWrap}>

			<div className={styles.analyticsPageContainer}>

				<h1 className={styles.headerTitle}>Аналитика</h1>

				<div className={styles.analyticsSelectContainer}>
					<div className={styles.analyticsSelectOperation}>
						<Select name={"expenses"} label={"Операции"} options={["Расходы", "Доходы", "Анализ доходов и расходов"]} />
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
						<p className={styles.analyticsDiagramInfo__title}>Общий расход</p>
						<p className={styles.analyticsDiagramInfo__value}>130 000.75 ₽</p>
						<p className={styles.analyticsDiagramInfo__date}>14.09.23 - 20.09.23</p>
					</div>

					<div className={styles.analyticsDiagram}>

						<div className={styles.diagram}></div>

						<div className={styles.diagramBlock}>

							<div className={styles.diagramBlockLeft}>
								<ul className={styles.diagramBlockLeftItems}>
									{DIAGRAM_ITEMS_DATA.slice(0, 8).map(item => (
										<li key={item.id} className={styles.diagramBlockLeftItem}>
											<div className={styles.diagramBlockLeftIconWrapper}>
												<div className={styles.diagramBlockLeftIconWrapper__circle} style={{background: `var(${item.background})`}}></div>
												<p className={styles.diagramBlockLeftIconWrapper__text}>{item.title}</p>
											</div>
											<p className={styles.diagramBlockLeftItem__value}>{item.value}</p>
										</li>
									))}
								</ul>
							</div>

							<div className={styles.diagramBlockRight}>
								<ul className={styles.diagramBlockRightItems}>
									{DIAGRAM_ITEMS_DATA.slice(8).map(item => (
										<li key={item.id} className={styles.diagramBlockRightItem}>
											<div className={styles.diagramBlockRightIconWrapper}>
												<div className={styles.diagramBlockRightIconWrapper__circle} style={{background: `var(${item.background})`}}></div>
												<p className={styles.diagramBlockRightIconWrapper__text}>{item.title}</p>
											</div>
											<p className={styles.diagramBlockRightItem__value}>{item.value}</p>
										</li>
									))}
								</ul>
							</div>

						</div>

					</div>

				</div>

			</div>

		</div>
	);
}

export default Analytics;