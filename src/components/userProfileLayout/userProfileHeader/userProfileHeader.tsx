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

import styles from "./userProfileHeader.module.scss";

const UserProfileHeader = ({ dollar, euro, crypto }: ICurrentRate) => {
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, "0");
		const month = (today.getMonth() + 1).toString().padStart(2, "0");
		const year = today.getFullYear().toString().slice(LastTwoDigits.LAST_TWO_DIGITS);

		const formattedDate = `${day}.${month}.${year}`;
		setCurrentDate(formattedDate);
	}, []);

	return (
		<div className={styles.userProfileHeaderWrap}>
			<div className={styles.userProfileHeaderContainer}>
				<div className={styles.currencyRateWrap}>
					<div className={styles.currencyRateContainer}>
						<p className={styles.currencyRateWrap__titles}>Курсы валют ЦБ РФ на {currentDate} </p>
						<p className={cn(styles.currencyRateWrap__titles, styles.currencyRateWrap__titles_valuta)}>
							$ {dollar || 0} € {euro || 0}
						</p>
						<div className={styles.cryptoWrap}>
							<Image src={cryptoIcon} alt={"crypto"} className={styles.cryptoWrap__icon} />
							<Image src={cryptoBlackIcon} alt={"cryptoBlack"} className={styles.cryptoWrap__iconBlack} />
							<p className={cn(styles.currencyRateWrap__titles, styles.currencyRateWrap__titles_color)}>
								{crypto || 0}
							</p>
						</div>
					</div>
					<div className={styles.navigationWrap}>
						<Link href={""}>
							<p className={styles.navigationWrap__link}>FAQ</p>
						</Link>
						<Link href={""}>
							<p className={styles.navigationWrap__link}>Поддержка</p>
						</Link>
						<Image src={infoIcon} alt={"info"} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileHeader;
