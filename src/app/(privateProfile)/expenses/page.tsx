"use client";

import { Key } from "react";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";
import { expensesTransactions } from "../../../mocks/ExpensesTransaction";

import style from "./expenses.module.scss";

export default function Expenses() {
	return (
		<div className={style.expensesPageWrap}>
			<div className={style.expensesContentWrapper}>
				<h1 className={style.headerTitle}>Расходы</h1>
				<div className={style.expensesByDateContainer}>
					<div className={style.totalMonthlyWrapper}>
						<p className={style.totalMonthlyWrapper__month}>Общий расход за Январь</p>
						<p className={style.totalMonthlyWrapper__sum}>283 000 ₽</p>
					</div>
					<div className={style.dateSelectionWrapper}>
						<p className={style.dateSelectionWrapper__text}>Выбор даты</p>
						<input className={style.dateSelectionWrapper__date} type="date" id="dateExpenses" />
					</div>
				</div>
				<div className={style.expensesDetailsContainer}>
					<div className={style.expensesDetailsContainer__category}>
						<label className={style.expensesDescription} htmlFor="Category">
							Постоянные
						</label>
						<select className={style.expenseItem} id="Category">
							<option value="Products">Продукты</option>
							<option value="Salary">Зарплата</option>
						</select>
					</div>
					<div className={style.expensesDetailsContainer__sum}>
						<label className={style.expensesDescription} htmlFor="Sum">
							Сумма
						</label>
						<input className={style.expensesSum} type="text" id="sum" placeholder="0.00 ₽" />
					</div>
					<button className={style.addButton} type="submit">
						<p className={style.addButton__text}>Добавить</p>
						<PlusIcon classNames={style.addButton__plusIcon} />{" "}
					</button>
				</div>
				<div className={style.expensesDetailsContainer}>
					<div className={style.expensesDetailsContainer__category}>
						<label className={style.expensesDescription} htmlFor="Category">
							Временные
						</label>
						<select className={style.expenseItem} id="Category" />
					</div>
					<div className={style.expensesDetailsContainer__sum}>
						<label className={style.expensesDescription} htmlFor="Sum">
							Сумма
						</label>
						<input type="text" id="sum" className={style.expensesSum} placeholder="0.00 ₽" />
					</div>
					<button className={style.addButton__disabled} type="submit">
						<p className={style.addButton__text}>Добавить</p>
						<PlusIcon classNames={style.addButton__plusIcon} />{" "}
					</button>
				</div>
			</div>
			<div className={style.expensesTransactionsWrapper}>
				<h1 className={style.expensesTransactionHeader}>Последние операции по расходам</h1>
				{expensesTransactions.map((expensesData, index: Key) => (
					<li key={index}>
						<ExpensesTransaction
							date1={expensesData.date1}
							date2={expensesData.date2}
							purpose={expensesData.purpose}
							sum={expensesData.sum}
						/>
					</li>
				))}
			</div>
		</div>
	);
}
