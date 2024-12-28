"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import cn from "classnames";

import { format } from "date-fns";

import { ICurrentRate } from "../../../types/common/ComponentsProps";

import cryptoIcon from "../../../assets/components/userProfile/crypto.svg";
import cryptoBlackIcon from "../../../assets/components/userProfile/cryptoBlack.svg";

import style from "./userProfileHeader.module.scss";

const UserProfileHeader = ({ dollar, euro, crypto }: ICurrentRate) => {
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
	}, []);

	return (
		<div className={style.userProfileHeaderWrap}>
			<div className={style.userProfileHeaderContainer}>
				<div className={style.currencyRateWrap}>
					<div className={style.currencyRateContainer}>
						<p className={style.currencyRateWrap__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
						<p className={cn(style.currencyRateWrap__titles, style.currencyRateWrap__titles_valuta)}>
							$ {dollar || 0} € {euro || 0}
						</p>
						<div className={style.cryptoWrap}>
							<Image src={cryptoIcon} alt={"crypto"} className={style.cryptoWrap__icon} />
							<Image src={cryptoBlackIcon} alt={"cryptoBlack"} className={style.cryptoWrap__iconBlack} />
							<p className={cn(style.currencyRateWrap__titles, style.currencyRateWrap__titles_color)}>{crypto || 0}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileHeader;
