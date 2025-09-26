import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../../types/pages/userProfileSettings";
import AppInput from "../../../../ui/appInput/AppInput";
import { errorPasswordRepeat } from "../../../../helpers/authConstants";
import { InputTypeList } from "../../../../helpers/Input";
import { passwordValidate } from "../../../../utils/passwordValidate";
import Button from "../../../../ui/Button/Button";
import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";
import {
	changePasswordPending,
	changePasswordFulfilled,
	changePasswordRejected,
} from "../../../../services/redux/features/userData/UserDataSlice";
import { ButtonType } from "../../../../helpers/buttonFieldValues";

import { changePassword } from "../../../../services/api/auth/changePassword";

import styles from "./privateProfileChangePassword.module.scss";

export const PrivateProfileChangePassword: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		watch,
		reset,
		control,
		formState: { errors },
	} = useForm<IChangePasswordForm>({
		defaultValues: { oldPassword: "", newPassword: "", repeatPassword: "" },
	});

	const onSubmit = async (data: IChangePasswordForm) => {
		dispatch(changePasswordPending());
		try {
			await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
			dispatch(changePasswordFulfilled(null));
			reset();
		} catch (err: any) {
			dispatch(changePasswordRejected(err?.message ?? "Ошибка при смене пароля"));
		}
	};

	const validateRepeatPassword = (value: string | boolean | undefined) => {
		const password = watch("newPassword");
		return value === password || errorPasswordRepeat;
	};

	return (
		<form className={styles.changePasswordFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.changePasswordFormWrap__title}>Смена пароля</p>
			<div className={styles.changePasswordSettingsWrap}>
				<AppInput
					label={"Текущий пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"oldPassword"}
					placeholder="Текущий пароль"
					rules={{ required: true }}
					error={errors.oldPassword}
				/>
				<AppInput
					label={"Новый пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"newPassword"}
					placeholder="Новый пароль"
					rules={{
						required: true,
						validate: passwordValidate,
					}}
					error={errors.newPassword}
				/>
				<AppInput
					label={"Подтвердить пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"repeatPassword"}
					placeholder="Подтвердите пароль"
					rules={{ required: true, validate: validateRepeatPassword }}
					error={errors.repeatPassword}
				/>
			</div>
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
