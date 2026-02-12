"use client";

import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";

import useAnalyticsPage from "../../../pageElements/privateProfile/analytics/useAnalyticsPage";

import { IAnalyticsTransactions } from "../../../types/components/ComponentsTypes";
import InputDate from "../../../ui/inputDate/inputDate";
import { Selector } from "../../../ui/selector/Selector";
import { InputTypeList } from "../../../helpers/Input";
import { analyticsIncomeTransactions } from "../../../mocks/AnalyticsIncomeTransaction";
import { analyticsExpensesTransactions } from "../../../mocks/AnalyticsExpensesTransaction";
import { analyticsSavingsTransactions } from "../../../mocks/AnalyticsSavingsTransaction";
import AnalystIncomeTransactions from "../../../components/userProfileLayout/analystIncomeTransactions/analystIncomeTransactions";
import AnalystExpensesTransactions from "../../../components/userProfileLayout/analystExpensesTransactions/analystExpensesTransactions";
import AnalystSavingsTransactions from "../../../components/userProfileLayout/analystSavingsTransactions/analystSavingsTransactions";
import InactivityLogoutModal from "../../../components/userProfileLayout/inactivityLogoutModal/inactivityLogoutModal";
import { DisplayMode, Operation } from "../../../helpers/analytics";
import { MoneyIcon } from "../../../assets/script/analytics/MoneyIcon";

import styles from "./analytics.module.scss";

ChartJS.register(ArcElement, Tooltip);
ChartJS.register(CategoryScale, LinearScale, BarElement);

function Analytics() {
	const {
		control,
		isOpenInactivityLogoutModal,
		isEmptyPage,
		operation,
		isLabel,
		displayMode,
		gettingDataAnalysis,
		gettingOptionsAnalysis,
		gettingDisplayDataAnalysis,
		gettingDisplayExpensesData,
		minimalRowValue,
		maximalRowValue,
		windowSizeXS,
		itemsToShow,
		gettingDataIncome,
		gettingRotationOptions,
		chartHeight,
		gettingExpensesData,
		setIsOpenInactivityLogoutModal,
		resetTimer,
		request,
		handleDisplayChange,
	} = useAnalyticsPage();

	const renderEmptyAnalyticsPage = () => (
		<div className={styles.analyticsBlankPage}>
			<p className={styles.analyticsBlankPage__text}>
				К сожалению, этот раздел пока пуст. Начните вести учет финансов в приложении и сможет воспользоваться этим
				разделом.
			</p>

			<MoneyIcon classNames={styles.analyticsBlankPage__image} />
		</div>
	);

	const renderExpenses = () => (
		<div className={styles.analyticsDiagramExpensesWrapper}>
			<div className={styles.analyticsDiagramExpensesInfo}>
				<p className={styles.analyticsDiagramExpensesInfo__title}>Общий расход</p>
				<p className={styles.analyticsDiagramExpensesInfo__value}>{expensesStatistics}</p>
				<p className={styles.analyticsDiagramExpensesInfo__date}>14.09.23 - 20.09.23</p>
			</div>

			<div className={styles.analyticsDiagramExpenses}>
				<div className={styles.diagramExpenses}>
					<Pie data={gettingExpensesData} options={{ responsive: true }} />
				</div>

				<div className={styles.diagramExpensesBlock}>
					<div className={styles.diagramExpensesBlockLeft}>
						<ul className={styles.diagramExpensesBlockLeftItems}>
							{gettingDisplayExpensesData.slice(minimalRowValue, maximalRowValue).map((item, index) => (
								<li key={index} className={styles.diagramExpensesBlockLeftItem}>
									<div className={styles.diagramExpensesBlockLeftIconWrapper}>
										<div
											className={styles.diagramExpensesBlockLeftIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramExpensesBlockLeftIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramExpensesBlockLeftItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.diagramExpensesBlockRight}>
						<ul className={styles.diagramExpensesBlockRightItems}>
							{gettingDisplayExpensesData.slice(itemsToShow).map((item, index) => (
								<li key={index} className={styles.diagramExpensesBlockRightItem}>
									<div className={styles.diagramExpensesBlockRightIconWrapper}>
										<div
											className={styles.diagramExpensesBlockRightIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramExpensesBlockRightIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramExpensesBlockRightItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	const renderIncome = () => (
		<div className={styles.analyticsDiagramIncomeWrapper}>
			<div className={styles.analyticsDiagramIncomeInfoWrapper}>
				<div className={styles.analyticsDiagramIncomeInfo}>
					<p className={styles.analyticsDiagramIncomeInfo__title}>Общий доход</p>
					<p className={styles.analyticsDiagramIncomeInfo__value}>{incomeStatistics}</p>
					<p className={styles.analyticsDiagramIncomeInfo__date}>14.09.23 - 20.09.23</p>
				</div>

				<div className={styles.analyticsDiagramIncome}>
					<div className={styles.diagramIncomeBlockLeft}>
						<ul className={styles.diagramIncomeBlockLeftItems}>
							{gettingDisplayExpensesData.slice(minimalRowValue, maximalRowValue).map((item, index) => (
								<li key={index} className={styles.diagramIncomeBlockLeftItem}>
									<div className={styles.diagramIncomeBlockLeftIconWrapper}>
										<div
											className={styles.diagramIncomeBlockLeftIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramIncomeBlockLeftIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramIncomeBlockLeftItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>

					{window.innerWidth > windowSizeXS && (
						<div className={styles.diagramIncomeBlockRight}>
							<ul className={styles.diagramIncomeBlockRightItems}>
								{gettingDisplayExpensesData.slice(itemsToShow).map((item, index) => (
									<li key={index} className={styles.diagramIncomeBlockRightItem}>
										<div className={styles.diagramIncomeBlockRightIconWrapper}>
											<div
												className={styles.diagramIncomeBlockRightIconWrapper__circle}
												style={{ background: `${item.background}` }}></div>
											<p className={styles.diagramIncomeBlockRightIconWrapper__text}>{item.title}</p>
										</div>
										<p className={styles.diagramIncomeBlockRightItem__value}>
											{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
										</p>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className={styles.diagramIncome} style={{ height: chartHeight }}>
				<Bar data={gettingDataIncome} options={gettingRotationOptions} />
			</div>

			{window.innerWidth <= windowSizeXS && (
				<div className={styles.diagramIncomeBlockRight}>
					<ul className={styles.diagramIncomeBlockRightItems}>
						{gettingDisplayExpensesData.slice(itemsToShow).map((item, index) => (
							<li key={index} className={styles.diagramIncomeBlockRightItem}>
								<div className={styles.diagramIncomeBlockRightIconWrapper}>
									<div
										className={styles.diagramIncomeBlockRightIconWrapper__circle}
										style={{ background: `${item.background}` }}></div>
									<p className={styles.diagramIncomeBlockRightIconWrapper__text}>{item.title}</p>
								</div>
								<p className={styles.diagramIncomeBlockRightItem__value}>
									{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);

	const renderAnalysis = () => (
		<div className={styles.analyticsDiagramAnalysisWrapper}>
			<div className={styles.analyticsDiagramAnalysisInfoWrapper}>
				<div className={styles.analyticsDiagramAnalysisInfo}>
					<p className={styles.analyticsDiagramAnalysisInfo__title}>Ваш баланс</p>
					{reportsBalance && <p className={styles.analyticsDiagramAnalysisInfo__value}>{reportsBalance}</p>}
					<p className={styles.analyticsDiagramAnalysisInfo__date}>14.09.23 - 20.09.23</p>
				</div>

				<div className={styles.analyticsDiagramAnalysis}>
					<div className={styles.diagramAnalysis}>
						<Doughnut data={gettingDataAnalysis} options={gettingOptionsAnalysis} />
					</div>

					<div className={styles.diagramAnalysisBlock}>
						<ul className={styles.diagramAnalysisBlockItems}>
<<<<<<< HEAD
							{displayDataAnalysis &&
								displayDataAnalysis.map((item, index) => (
									<li key={index} className={styles.diagramAnalysisBlockItem}>
										<div className={styles.diagramAnalysisBlockIconWrapper}>
											<div
												className={styles.diagramAnalysisBlockIconWrapper__circle}
												style={{ background: `${item.background}` }}></div>
											<p className={styles.diagramAnalysisBlockIconWrapper__text}>{item.title}:</p>
										</div>
										<p className={styles.diagramAnalysisBlockItem__value}>
											{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
										</p>
									</li>
								))}
=======
							{gettingDisplayDataAnalysis.map((item, index) => (
								<li key={index} className={styles.diagramAnalysisBlockItem}>
									<div className={styles.diagramAnalysisBlockIconWrapper}>
										<div
											className={styles.diagramAnalysisBlockIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramAnalysisBlockIconWrapper__text}>{item.title}:</p>
									</div>
									<p className={styles.diagramAnalysisBlockItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
>>>>>>> 557f9dd6 (feat: add useMemo optimization for chart objects)
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	const renderContentAnalyticsPage = () => (
		<div className={styles.analyticsPagesContent}>
			<div className={styles.analyticsSelectContainer}>
				<div className={styles.analyticsSelectOperation}>
					<Selector
						name={"number"}
						label={"Операции"}
						options={[Operation.Expenses, Operation.Income, Operation.Analysis, Operation.ListOfOperations]}
						control={control}
					/>
				</div>
				<div className={styles.analyticsSelectDateAndPeriod}>
					<InputDate control={control} name={"date"} isPeriod={true} isLabel={isLabel} />
				</div>
			</div>

			<div className={styles.analyticsDisplayWrapper}>
				<p className={styles.analyticsDisplay_title}>Отображать в:</p>
				<div className={styles.analyticsDisplay}>
					<input
						name="value"
						type={InputTypeList.Radio}
						value="rub"
						id="analyticsDisplay__rub"
						checked={displayMode === DisplayMode.RUB}
						className={styles.analyticsDisplay__input}
						onChange={handleDisplayChange}
					/>
					<label htmlFor="analyticsDisplay__rub" className={styles.analyticsDisplay__label}>
						<p className={styles.analyticsDisplay__text}>В рублях</p>
					</label>
					<input
						name="value"
						type={InputTypeList.Radio}
						value="percent"
						id="analyticsDisplay__percent"
						checked={displayMode === DisplayMode.PERCENT}
						onChange={handleDisplayChange}
						className={styles.analyticsDisplay__input}
					/>
					<label htmlFor="analyticsDisplay__percent" className={styles.analyticsDisplay__label}>
						<p className={styles.analyticsDisplay__text}>В процентах</p>
					</label>
				</div>
			</div>

			{operation === Operation.Expenses && renderExpenses()}

			{operation === Operation.Income && renderIncome()}

			{operation === Operation.Analysis && renderAnalysis()}
		</div>
	);

	const renderAnalyticsIncomeTransactions = (transactions: IAnalyticsTransactions[]) => {
		return transactions.map((savingsData, index) => (
			<li key={index}>
				<AnalystIncomeTransactions
					firstDate={savingsData.firstDate}
					secondDate={savingsData.secondDate}
					purpose={savingsData.purpose}
					sum={savingsData.sum}
				/>
			</li>
		));
	};

	// const renderAnalyticsExpensesTransactions = (transactions: IFinancialTransaction[] & ICategoryBudget[]) => {
	// 	if (transactions !== null) {
	// 		return transactions.map((data: IFinancialTransaction & ICategoryBudget, index: Key) => (
	// 			<li key={index}>
	// 				<AnalystExpensesTransactions
	// 					month={data.month}
	// 					category_name={data.category_name}
	// 					amount={data.amount}
	// 					category_id={0}
	// 				/>
	// 			</li>
	// 		));
	// 	}
	// };

	const renderAnalyticsSavingsTransactions = (transactions: IAnalyticsTransactions[]) => {
		return transactions.map((savingsData, index) => (
			<li key={index}>
				<AnalystSavingsTransactions
					firstDate={savingsData.firstDate}
					secondDate={savingsData.secondDate}
					purpose={savingsData.purpose}
					sum={savingsData.sum}
				/>
			</li>
		));
	};

	const renderListOfOperations = () => (
		<div className={styles.analyticsListOfOperationsWrapper}>
			<div className={styles.analyticsListOfOperationsContainer}>
				<div className={styles.analyticsListOfOperationsSelectsBlock}>
					<div className={styles.analyticsSelectOperation}>
						<Selector
							name={"number"}
							label={"Операции"}
							options={[Operation.Expenses, Operation.Income, Operation.Analysis, Operation.ListOfOperations]}
							control={control}
						/>
					</div>
					<div className={styles.analyticsSelectDateAndPeriod}>
						<InputDate control={control} name={"date"} isPeriod={true} isLabel={isLabel} />
					</div>
				</div>
				<div className={styles.analyticsListOfOperationsDownloadWrapper}>
					<p className={styles.analyticsListOfOperationsDownloadWrapper__title}>Скачать</p>
					<div className={styles.analyticsListOfOperationsButtonContent}>
						<button className={styles.analyticsListOfOperationsButtonContent__PdfButton}>PDF</button>
						<button className={styles.analyticsListOfOperationsButtonContent__XslButton}>XSL</button>
					</div>
				</div>
			</div>

			<div className={styles.analyticsListOfOperationsContent}>
				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с доходами</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{analyticsIncomeTransactions && renderAnalyticsIncomeTransactions(analyticsIncomeTransactions)}
					</ul>
				</div>

				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с расходами</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{/* {listOfOperations && renderAnalyticsExpensesTransactions(listOfOperations)} */}
					</ul>
				</div>

				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с накоплениями</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{analyticsSavingsTransactions && renderAnalyticsSavingsTransactions(analyticsSavingsTransactions)}
					</ul>
				</div>
			</div>
		</div>
	);

	return (
		<div className={styles.analyticsPageWrap}>
			<div className={styles.analyticsPageContainer}>
				<h1 className={styles.headerTitle}>Аналитика</h1>
				{operation === Operation.ListOfOperations
					? renderListOfOperations()
					: isEmptyPage
						? renderEmptyAnalyticsPage()
						: renderContentAnalyticsPage()}
			</div>
			<InactivityLogoutModal
				open={isOpenInactivityLogoutModal}
				onStayClick={() => [resetTimer(), setIsOpenInactivityLogoutModal(false)]}
				onLogoutClick={() => [request(), setIsOpenInactivityLogoutModal(false)]}
				onModalTimerExpiring={() => [request(), setIsOpenInactivityLogoutModal(false)]}
			/>
		</div>
	);
}

export default Analytics;
