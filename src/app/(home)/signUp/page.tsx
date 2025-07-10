"use client";

import { CurtainVK } from "../../../components/mainLayout/curtainVk/curtainVk";
import SignUpForm from "../../../components/mainLayout/signUpForm/signUpForm";

import styles from "./signUp.module.scss";

function SignUp() {
	return (
		<div className={styles.signUpWrap}>
			<CurtainVK handleError={() => undefined} />
			<SignUpForm />
		</div>
	);
}

export default SignUp;
