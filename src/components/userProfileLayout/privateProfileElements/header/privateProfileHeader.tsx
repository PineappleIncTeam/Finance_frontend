"use client";

import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import cn from "classnames";
import axios from "axios";
import { useRouter } from "next/navigation";

import { MainPath } from "../../../../services/router/routes";
import { ApiResponseCode } from "../../../../helpers/apiResponseCode";
import { fetchCurrencyRates } from "../../../../services/api/userProfile/getCurrencies";
import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";

import styles from "./privateProfileHeader.module.scss";

const PrivateProfileHeader = () => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [dollar, setDollar] = useState<number>(0);
	const [euro, setEuro] = useState<number>(0);
	const [crypto, setCrypto] = useState<number>(0);
	const router = useRouter();

	const [isCurrencyLoading, startCurrencyTransition] = useTransition();

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));

		loadCurrencyData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const loadCurrencyData = async () => {
		try {
			const baseUrl = getCorrectBaseUrl();
			const response = await fetchCurrencyRates(baseUrl);

			if (response.status === axios.HttpStatusCode.Ok) {
				startCurrencyTransition(() => {
					setDollar(+response.data[0].rate.toFixed(2));
					setEuro(+response.data[1].rate.toFixed(2));
					setCrypto(+response.data[2].rate.toFixed(2));
				});
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
		}
	};

	return (
		<div className={styles.userProfileHeaderWrap}>
			<div className={styles.userProfileHeaderContainer}>
				<p className={styles.userProfileHeaderContainer__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
				<p className={cn(styles.userProfileHeaderContainer__titles, styles.userProfileHeaderContainer__exchange)}>
					$ {isCurrencyLoading ? "?" : dollar} € {isCurrencyLoading ? "?" : euro} ₿ {isCurrencyLoading ? "?" : crypto}
				</p>
			</div>
		</div>
	);
};

export default PrivateProfileHeader;
