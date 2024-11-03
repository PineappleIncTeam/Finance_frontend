import SignInForm from "../../../components/mainLayout/signInForm/signInForm";

import styles from "./signIn.module.scss";

function SignIn() {
	return (
		<div className={styles.signInWrap}>
			<SignInForm />
		</div>
	);
}

export default SignIn;
