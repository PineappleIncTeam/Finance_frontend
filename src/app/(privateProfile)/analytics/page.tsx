"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

// import { MoneyIcon } from "../../../assets/script/analytics/MoneyIcon";

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
			valuePercent: "1.00",
			valueRub: 1300.01
		},
		{
			id: 2,
			background: "--color-lavender-blush",
			title: "Стрижка",
			valuePercent: "3.00",
			valueRub: 3900.02
		},
		{
			id: 3,
			background: "--color-sage-green",
			title: "Бассейн",
			valuePercent: "2.50",
			valueRub: 3250.02
		},
		{
			id: 4,
			background: "--color-light-peach",
			title: "Школа",
			valuePercent: "1.26",
			valueRub: 1638.83
		},
		{
			id: 5,
			background: "--color-burnt-orange",
			title: "Еда",
			valuePercent: "2.04",
			valueRub: 2652.06
		},
		{
			id: 6,
			background: "--color-soft-tan",
			title: "Плата жилья",
			valuePercent: "11.70",
			valueRub: 15271.09
		},
		{
			id: 7,
			background: "--color-peach",
			title: "Ногти",
			valuePercent: "0.30",
			valueRub: 390.00
		},
		{
			id: 8,
			background: "--color-dark-sea-green",
			title: "Бензин",
			valuePercent: "0.75",
			valueRub: 975.56
		},
		{
			id: 9,
			background: "--color-dusty-rose",
			title: "Дорога работа",
			valuePercent: "1.03",
			valueRub: 1340.79
		},
		{
			id: 10,
			background: "--color-steel-blue",
			title: "Юрист",
			valuePercent: "7.00",
			valueRub: 9110.05
		},
		{
			id: 11,
			background: "--color-sunny-yellow",
			title: "Детский сад",
			valuePercent: "12.40",
			valueRub: 16192.09
		},
		{
			id: 12,
			background: "--color-peach-pink",
			title: "Учебники",
			valuePercent: "2.00",
			valueRub: 2600.01
		},
		{
			id: 13,
			background: "--color-forest-green",
			title: "Отпуск",
			valuePercent: "4.95",
			valueRub: 6437.57
		},
		{
			id: 14,
			background: "--color-olive-green",
			title: "Театр",
			valuePercent: "1.30",
			valueRub: 1690.01
		},
		{
			id: 15,
			background: "--color-pale-lemon",
			title: "Кредит",
			valuePercent: "20.00",
			valueRub: 26000.15
		},
		{
			id: 16,
			background: "--color-dark-olive",
			title: "Страховка",
			valuePercent: "0.40",
			valueRub: 520.00
		},
		{
			id: 17,
			background: "--color-golden-olive",
			title: "Киберспорт",
			valuePercent: "0.40",
			valueRub: 520.00
		},
		{
			id: 18,
			background: "--color-light-blue-gray",
			title: "Путешествия",
			valuePercent: "0.40",
			valueRub: 520.00
		},
		{
			id: 19,
			background: "--color-burnt-orange",
			title: "Кино",
			valuePercent: "0.40",
			valueRub: 520.00
		},
		{
			id: 20,
			background: "--color-bright-lime",
			title: "Ипотека",
			valuePercent: "7.37",
			valueRub: 9586.33
		}
	];
	

	// const itemsToShow = window.innerWidth <= 1440 ? 0 : 8;
	const [itemsToShow, setItemsToShow] = useState(8);
	const [displayMode, setDisplayMode] = useState("rub");

    useEffect(() => {
        const handleResize = () => {
            setItemsToShow(window.innerWidth <= 1440 ? 0 : 8);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

	const handleDisplayChange = (event) => {
		setDisplayMode(event.target.value);
	};

	return (
		<div className={styles.analyticsPageWrap}>

			<div className={styles.analyticsPageContainer}>

				<h1 className={styles.headerTitle}>Аналитика</h1>

				{/* <div className={styles.analyticsBlankPage}>

					<p className={styles.analyticsBlankPage__text}>К сожалению, этот раздел пока пуст. Начните вести учет финансов в приложении и сможет воспользоваться этим разделом.</p>
					
					<MoneyIcon classNames={styles.analyticsBlankPage__image}/>

				</div> */}

				<div className={styles.analyticsPagesContent}>

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
								value="rub"
								id="analyticsDisplay__rub"
								checked={displayMode === "rub"}
								className={styles.analyticsDisplay__input}
								onChange={handleDisplayChange}
								defaultChecked
							/>
							<label htmlFor="analyticsDisplay__rub" className={styles.analyticsDisplay__label}>
								<p className={styles.analyticsDisplay__text}>В рублях</p>
							</label>
							<input
								name="value"
								type="radio"
								value="percent"
								id="analyticsDisplay__percent"
								checked={displayMode === "percent"}
								onChange={handleDisplayChange}
								className={styles.analyticsDisplay__input}
							/>
							<label htmlFor="analyticsDisplay__percent" className={styles.analyticsDisplay__label}>
								<p className={styles.analyticsDisplay__text}>В процентах</p>
							</label>
						</div>
					</div>

					<div className={styles.analyticsDiagramExpensesWrapper}>

						<div className={styles.analyticsDiagramExpensesInfo}>
							<p className={styles.analyticsDiagramExpensesInfo__title}>Общий расход</p>
							<p className={styles.analyticsDiagramExpensesInfo__value}>130 000.75 ₽</p>
							<p className={styles.analyticsDiagramExpensesInfo__date}>14.09.23 - 20.09.23</p>
						</div>

						<div className={styles.analyticsDiagramExpenses}>

							<div className={styles.diagramExpenses}></div>

							<div className={styles.diagramExpensesBlock}>

								<div className={styles.diagramExpensesBlockLeft}>
									<ul className={styles.diagramExpensesBlockLeftItems}>
										{DIAGRAM_ITEMS_DATA.slice(0, 8).map(item => (
											<li key={item.id} className={styles.diagramExpensesBlockLeftItem}>
												<div className={styles.diagramExpensesBlockLeftIconWrapper}>
													<div className={styles.diagramExpensesBlockLeftIconWrapper__circle} style={{background: `var(${item.background})`}}></div>
													<p className={styles.diagramExpensesBlockLeftIconWrapper__text}>{item.title}</p>
												</div>
												<p className={styles.diagramExpensesBlockLeftItem__value}>
                                                    {displayMode === "rub" ? `${item.valueRub} ₽` : `${item.valuePercent}%`}
                                                </p>
											</li>
										))}
									</ul>
								</div>

								<div className={styles.diagramExpensesBlockRight}>
									<ul className={styles.diagramExpensesBlockRightItems}>
										{DIAGRAM_ITEMS_DATA.slice(itemsToShow).map(item => (
											<li key={item.id} className={styles.diagramExpensesBlockRightItem}>
												<div className={styles.diagramExpensesBlockRightIconWrapper}>
													<div className={styles.diagramExpensesBlockRightIconWrapper__circle} style={{background: `var(${item.background})`}}></div>
													<p className={styles.diagramExpensesBlockRightIconWrapper__text}>{item.title}</p>
												</div>
												<p className={styles.diagramExpensesBlockRightItem__value}>
                                                    {displayMode === "rub" ? `${item.valueRub} ₽` : `${item.valuePercent}%`}
                                                </p>
											</li>
										))}
									</ul>
								</div>

							</div>

						</div>

					</div>
					
				</div>

			</div>

		</div>
	);
}

export default Analytics;