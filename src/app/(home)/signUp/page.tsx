import SignUpForm from "../../../components/mainLayout/signUpForm/signUpForm";

import styles from "./signUp.module.scss";

function SignUp() {
	return (
		<div className={styles.signUpWrap}>
			<SignUpForm />
		</div>
	);
}

export default SignUp;
