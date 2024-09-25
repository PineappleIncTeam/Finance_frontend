"use client";

import { ITitle } from "../../types/common/UiKitProps";

import styles from "./Title.module.css";

const Title = ({ title }: ITitle) => {
	return <h1 className={styles.titleWrap}>{title}</h1>;
};

export default Title;
