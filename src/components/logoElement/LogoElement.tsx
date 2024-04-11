import LogoSVG from "../../assets/LogoSVG.svg";

import styles from "./LogoElement.module.css";

function Logo() {
	return (
		<div className="logo_block">
			<img className={styles.img} src={LogoSVG}></img>
			<h3 className="logo">FREEnance</h3>
			<div className="logo_text"></div>
		</div>
	);
}

export default Logo;
