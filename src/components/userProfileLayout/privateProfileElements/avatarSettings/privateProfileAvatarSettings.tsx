import { useForm } from "react-hook-form";
import Image from "next/image";

import { useAppDispatch } from "../../../../services/redux/hooks";

import { setUser, setLoading, setError } from "../../../../services/redux/features/userData/UserDataSlice";

import { updateUserData } from "../../../../services/api/auth/updateUserData";

import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";

import { IPrivateAppSettings, IUserAvatar } from "../../../../types/pages/userProfileSettings";

import { IUserData } from "../../../../types/redux/StoreTypes";

import { InputTypeList } from "../../../../helpers/Input";

import { avatarTemplates } from "../../../../mocks/AvatarTemplates";

// import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
// import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";
import userAvatar from "../../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../../assets/components/userProfile/editProfile.svg";
import Button from "../../../../ui/Button/Button";
import { ButtonType } from "../../../../helpers/buttonFieldValues";

import styles from "./privateProfileAvatarSettings.module.scss";

type IFormData = IPrivateAppSettings & IUserAvatar;
export const PrivateProfileAvatarSettings = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue, watch } = useForm<IFormData>({
		mode: "all",
		delayError: 200,
	});

	const personalAvatar = watch("personalAvatar");
	// const templateAvatar = watch("templateAvatar");

	const onSubmit = async (data: IFormData) => {
		try {
			dispatch(setLoading(true));
			const baseUrl = getCorrectBaseUrl();

			const payload: Partial<IUserData> = {
				currency: data.currency,
				darkTheme: data.darkTheme ? "dark" : "light",
				finAssistant: data.finAssistant,
				personalAvatar: data.personalAvatar || data.templateAvatar,
			};

			const resp = await updateUserData(payload, baseUrl);
			const updated = resp?.data ?? resp;

			dispatch(setUser(updated));
			dispatch(setError(null));
		} catch (error: any) {
			dispatch(setError(error?.message ?? "Ошибка при обновлении"));
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setValue("personalAvatar", e.target.files[0].toString());
		}
	};

	return (
		<form className={styles.avatarForm} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.avatarForm__title}>Аватар</p>

			<div className={styles.avatarSettingsWrap}>
				<div className={styles.avatar__wrapper}>
					<div className={styles.avatar__picture}>
						<Image
							src={personalAvatar ? URL.createObjectURL(personalAvatar as unknown as File) : userAvatar}
							alt="userAvatar"
							className={styles.avatar__image}
							width={100}
							height={100}
						/>
						<div className={styles.avatar__editButtonWrapper}>
							<label htmlFor="userAvatar" className={styles.avatar__editButton}>
								<input
									type={InputTypeList.File}
									id="userAvatar"
									className={styles.avatar__input}
									{...register("personalAvatar")}
									onChange={handleAvatarChange}
								/>
								<Image src={editProfileIcon} alt="editProfile" className={styles.avatar__editIcon} />
							</label>
						</div>
					</div>
				</div>

				<div className={styles.avatarTemplatesWrap}>
					{avatarTemplates.map((avatar, index) => (
						<div className={styles.avatarPictureWrap} key={index}>
							<input
								type={InputTypeList.Radio}
								id={`template-avatar-${index}`}
								value={avatar}
								{...register("templateAvatar")}
								className={styles.templateAvatar__input}
							/>
							<label htmlFor={`template-avatar-${index}`} className={styles.templateAvatar__label}>
								<Image src={avatar} className={styles.avatarTemplates__img} alt="" width={50} height={50} />
							</label>
						</div>
					))}
				</div>
			</div>

			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
