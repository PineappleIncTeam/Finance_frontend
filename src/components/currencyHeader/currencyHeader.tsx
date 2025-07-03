"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import { format } from "date-fns";

import { fetchCurrencyRates } from "../../services/api/currencies/currenciesApi";

const CurrencyHeader = () => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [dollar, setDollar] = useState<number>(0);
	const [euro, setEuro] = useState<number>(0);
	const [crypto, setCrypto] = useState<number>(0);

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));

		const fetchData = async () => {
			const rates = await fetchCurrencyRates();
			setDollar(rates.dollar);
			setEuro(rates.euro);
			setCrypto(rates.crypto);
		};

		fetchData();
	}, []);

	return (
		<div className="userProfileHeaderWrap">
			<div className="userProfileHeaderContainer">
				<p className="userProfileHeaderContainer__titles">Курсы валют ЦБ РФ на {currentDate}</p>
				<p className={cn("userProfileHeaderContainer__titles", "userProfileHeaderContainer__exchange")}>
					$ {dollar.toFixed(2)} € {euro.toFixed(2)} ₿ {crypto.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default CurrencyHeader;
