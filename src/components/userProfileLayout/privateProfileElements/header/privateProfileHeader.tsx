"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import cn from "classnames";

import { fetchCurrencyRates } from "../../../../services/api/currencies/currenciesApi";

import styles from "./privateProfileHeader.module.scss";

const PrivateProfileHeader = () => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [dollar, setDollar] = useState<number>(0);
	const [euro, setEuro] = useState<number>(0);
	const [crypto, setCrypto] = useState<number>(0);

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));

		const loadCurrencyData = async () => {
			const rates = await fetchCurrencyRates();
			setDollar(rates.dollar);
			setEuro(rates.euro);
			setCrypto(rates.crypto);
		};

		loadCurrencyData();
	}, []);

	return (
		<div className={styles.userProfileHeaderWrap}>
			<div className={styles.userProfileHeaderContainer}>
				<p className={styles.userProfileHeaderContainer__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
				<p className={cn(styles.userProfileHeaderContainer__titles, styles.userProfileHeaderContainer__exchange)}>
					$ {dollar || 0} € {euro || 0} ₿ {crypto || 0}
				</p>
			</div>
		</div>
	);
};

export default PrivateProfileHeader;
