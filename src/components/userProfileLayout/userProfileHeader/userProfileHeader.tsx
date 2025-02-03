"use client";

import { useEffect, useState } from "react";
import cn from "classnames";

import { format } from "date-fns";

import { ICurrentRate } from "../../../types/common/ComponentsProps";

import styles from "./userProfileHeader.module.scss";

const UserProfileHeader = ({ dollar, euro, crypto }: ICurrentRate) => {
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
	}, []);

	return (
		<div className={styles.userProfileHeaderWrap}>
			<div className={styles.userProfileHeaderContainer}>
				<p className={styles.currencyRateWrap__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
				<p className={cn(styles.currencyRateWrap__titles, styles.currencyRateWrap__exchange)}>
					$ {dollar || 0} € {euro || 0} ₿ {crypto || 0}
				</p>
			</div>
		</div>
	);
};

export default UserProfileHeader;
