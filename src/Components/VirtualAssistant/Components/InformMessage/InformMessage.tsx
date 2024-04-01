import React from "react";

import infoImage from "../../../../Images/infoImage.svg";

import style from "./InformMessage.module.css";

const InformMessage = ({ text }) => {
	return (
		<div className={style.inform_message_block}>
			<div className={style.inform_message_image}>
				<img src={infoImage} alt="I" />
			</div>
			<div className={style.inform_message_text}>{text}</div>
		</div>
	);
};

export default InformMessage;
