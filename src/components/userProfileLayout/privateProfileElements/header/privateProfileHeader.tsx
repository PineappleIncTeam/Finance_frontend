"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import CurrencyHeader from "../../../currencyHeader/currencyHeader";

import styles from "./privateProfileHeader.module.scss";

const PrivateProfileHeader = () => {
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
	}, []);

	return (
		<div className={styles.userProfileHeaderWrap}>
			<div className={styles.userProfileHeaderContainer}>
				<p className={styles.userProfileHeaderContainer__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
				<CurrencyHeader />
			</div>
		</div>
	);
};

export default PrivateProfileHeader;
