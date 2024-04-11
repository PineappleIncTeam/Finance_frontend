import TheManImage from "../../../assets/theMan.svg";

import style from "./PersonElement.module.css";

const PersonElement = () => {
	return (
		<div className={style.the_man_image}>
			<img src={TheManImage} alt="The Man" />
		</div>
	);
};

export default PersonElement;
