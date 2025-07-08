"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import cn from "classnames";

import axios from "axios";

import { useRouter } from "next/navigation";

import { MainPath } from "../../../../services/router/routes";

import { ApiResponseCode } from "../../../../helpers/apiResponseCode";

import { fetchCurrencyRates } from "../../../../services/api/currencies/currenciesApi";

import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";

import styles from "./privateProfileHeader.module.scss";

const PrivateProfileHeader = () => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [dollar, setDollar] = useState<number>(0);
	const [euro, setEuro] = useState<number>(0);
	const [crypto, setCrypto] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));

		const loadCurrencyData = async () => {
			try {
				const baseUrl = getCorrectBaseUrl();
				const response = await fetchCurrencyRates(baseUrl);

				if (response.status === axios.HttpStatusCode.Ok) {
					const rates: Record<string, number> = {};
					response.data.forEach((item) => {
						rates[item.title.toLowerCase()] = item.value;
					});

					setDollar(rates.usd || 0);
					setEuro(rates.eur || 0);
					setCrypto(rates.btc || 0);
				}
			} catch (error) {
				if (
					axios.isAxiosError(error) &&
					error.response &&
					error.response.status &&
					error.response.status >= axios.HttpStatusCode.InternalServerError &&
					error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
				) {
					router.push(MainPath.ServerError);
				}
				throw new Error("Currency fetch error:", { cause: error });
			}
		};

		loadCurrencyData();
	}, [router]);

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
