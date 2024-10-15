"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import { ICurrentRate } from "../../../types/common/ComponentsProps";
import { LastTwoDigits } from "../../../helpers/lastTwoDigits";

import cryptoIcon from "../../../assets/components/userProfile/crypto.svg";
import cryptoBlackIcon from "../../../assets/components/userProfile/cryptoBlack.svg";
import infoIcon from "../../../assets/components/userProfile/infoIcon.svg";

import style from "./userProfileHeader.module.scss";

const UserProfileHeader = ({ dollar, euro, crypto }: ICurrentRate) => {
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, "0");
		const month = (today.getMonth() + 1).toString().padStart(2, "0");
		const year = today.getFullYear().toString().slice(LastTwoDigits.LAST_TWO_DIGITS);

		const formattedDate = `${day}.${month}.${year}`;
		setCurrentDate(formattedDate); // eslint-disable-next-line react-hooks/exhaustive-deps
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
					<div className={style.navigationWrap}>
						<Link href={""}>
							<p className={style.navigationWrap__link}>FAQ</p>
						</Link>
						<Link href={""}>
							<p className={style.navigationWrap__link}>Поддержка</p>
						</Link>
						<Image src={infoIcon} alt={"info"} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileHeader;
