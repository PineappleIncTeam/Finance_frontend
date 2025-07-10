"use client";

import { CurtainVK } from "../../../components/mainLayout/curtainVk/curtainVk";
import SignInForm from "../../../components/mainLayout/signInForm/signInForm";

import styles from "./signIn.module.scss";

function SignIn() {
	return (
		<div className={styles.signInWrap}>
			<CurtainVK handleError={() => undefined} />
			<SignInForm />
		</div>
	);
}

export default SignIn;
