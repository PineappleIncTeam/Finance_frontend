"use client";

import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { env } from "next-runtime-env";

import { IProfileAvatarForm } from "../../../../types/components/ComponentsTypes";
import { TChangeUserProfileDataRequest } from "../../../../types/api/PersonalAccount";
import Button from "../../../../ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/hooks";
import { setUser } from "../../../../services/redux/features/userData/UserDataSlice";
import { userDataSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { updateUserProfileData } from "../../../../services/api/userProfile/updateUserData";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";
import { avatarTemplates } from "../../../../mocks/AvatarTemplates";

import userAvatar from "../../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../../assets/components/userProfile/editProfile.svg";

import styles from "./privateProfileAvatarSettings.module.scss";

export const PrivateProfileAvatarSettings = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue, watch } = useForm<IProfileAvatarForm>({
		mode: "all",
		delayError: 200,
	});

	const userData = useAppSelector(userDataSelector);
	const userProfileData = userData.userData;

	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

	const personalAvatar = watch("personalAvatar");

	const onSubmit = async (data: IProfileAvatarForm) => {
		const userData: TChangeUserProfileDataRequest = {
			avatar: data?.personalAvatar || "",
			defaultAvatar: 0, // need to fix
			nickname: userProfileData.nickname,
			gender: userProfileData.gender,
			country: 1, // need to fix
		};

		const updatingUserDataResponse = await updateUserProfileData(userData, baseUrl);
		const updatedData = updatingUserDataResponse?.data ?? updatingUserDataResponse;

		dispatch(setUser(updatedData));
	};

	const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
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
							src={personalAvatar ? (personalAvatar as unknown as File) : userAvatar}
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
