import React from "react";

import TheManImage from "../../../../assets/theMan.svg";

import style from "./TheMan.module.css";

const TheMan = () => {
	return (
		<div className={style.the_man_image}>
			<img src={TheManImage} alt="The Man" />
		</div>
	);
};

export default TheMan;
