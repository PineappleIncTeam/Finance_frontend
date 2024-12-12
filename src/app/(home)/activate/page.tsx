"use client";

import Image from "next/image";

import logo from "../../../assets/pages/activate/logo.png";

import style from "./activate.module.scss";

const Activate = () => {
	const successMessageTitle = "Добро пожаловать!";
	const successMessageDescription = "Начните планировать свои финансы с нами прямо сейчас";

	const messageElement = () => {
		return (
			<div className={style.message}>
				<div className={style.logo}>
					<Image src={logo} alt="иконка" className={style.icon} />
				</div>
				<div className={style.title}>{successMessageTitle}</div>
				<div className={style.description}>{successMessageDescription}</div>
			</div>
		);
	};

	return (
		<div className={style.wrapper}>
			<div className={style.messageWrapper}>{messageElement()}</div>
		</div>
	);
};

export default Activate;
