"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NextImage from "next/image";
import cn from "classnames/dedupe";
import { env } from "next-runtime-env";

import { IProfileAvatarForm } from "../../../../types/components/ComponentsTypes";
import { TChangeUserProfileDataRequest } from "../../../../types/api/PersonalAccount";
import Button from "../../../../ui/Button/Button";
import { useActions, useAppSelector } from "../../../../services/redux/hooks";
import { userDataSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { updateUserProfileData } from "../../../../services/api/userProfile/updateUserData";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";
import { avatarTemplates } from "../../../../mocks/AvatarTemplates";

import editProfileIcon from "../../../../assets/components/userProfile/editProfile.svg";
import mockAvatar from "../../../../assets/components/userProfile/userPhoto.svg";

import styles from "./privateProfileAvatarSettings.module.scss";

export const PrivateProfileAvatarSettings = () => {
	const [selectedDefaultAvatar, setSelectedDefaultAvatar] = useState<string>();

	const { register, handleSubmit, setValue, watch } = useForm<IProfileAvatarForm>({
		mode: "all",
		delayError: 200,
	});

	const userData = useAppSelector(userDataSelector);
	const { setUserData } = useActions();
	const userProfileData = userData.userData;

	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

	const maxFileSize: number = 5120;
	const minImageWidth: number = 808;
	const maxImageWidth: number = 1920;
	const minImageHight: number = 632;
	const maxImageHight: number = 1080;
	const mockMinimalBase64Length = 10000;

	const templateAvatar = watch("templateAvatar");
	const personalAvatar = watch("personalAvatar");

	function setCurrentAvatar() {
		if (userProfileData.avatar && userProfileData.avatar.length > mockMinimalBase64Length) {
			setValue("personalAvatar", userProfileData.avatar);
		}
		if (userProfileData.defaultAvatar > 0 && userProfileData.defaultAvatar <= avatarTemplates.length) {
			setValue("templateAvatar", `templateAvatar${userProfileData.defaultAvatar}`);
			setSelectedDefaultAvatar(`templateAvatar${userProfileData.defaultAvatar}`);
		}
	}

	useEffect(() => {
		setCurrentAvatar();

		return () => {
			setCurrentAvatar();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isValidSize = (width: number, height: number) => {
		return width >= minImageWidth && width <= maxImageWidth && height >= minImageHight && height <= maxImageHight;
	};

	const readImage = (file: File) => {
		const reader = new FileReader();

		reader.onload = () => {
			const imageDataUrl = reader.result as string;
			const img = new Image();
			img.src = imageDataUrl;
			img.onload = () => {
				if (isValidSize(img.width, img.height)) {
					setValue("personalAvatar", imageDataUrl);
					setValue("templateAvatar", "");
					setSelectedDefaultAvatar("");
				}
			};
		};
		reader.readAsDataURL(file);
	};

	const onSubmit = async (data: IProfileAvatarForm) => {
		let defaultAvatarNumber = 0;
		let personalAvatarTitle = "";

		if (data.templateAvatar) {
			defaultAvatarNumber = Number(data.templateAvatar.at(data.templateAvatar.length - 1));
		}

		if (data.personalAvatar && data.personalAvatar.length > mockMinimalBase64Length) {
			personalAvatarTitle = data.personalAvatar;
		}

		const userData: TChangeUserProfileDataRequest = {
			avatar: personalAvatarTitle,
			defaultAvatar: defaultAvatarNumber,
			nickname: userProfileData.nickname,
			gender: userProfileData.gender,
			country: userProfileData.country,
		};

		const updatingUserDataResponse = await updateUserProfileData(userData, baseUrl);
		const updatedData = updatingUserDataResponse?.data ?? updatingUserDataResponse;

		setUserData(updatedData);
	};

	function getSelectedAvatarSource() {
		let selectedAvatar = mockAvatar;

		if (personalAvatar) {
			selectedAvatar = personalAvatar.length ? personalAvatar : selectedAvatar;
		}

		if (templateAvatar && selectedDefaultAvatar) {
			selectedAvatar = avatarTemplates[Number(selectedDefaultAvatar.at(selectedDefaultAvatar.length - 1)) - 1];
		}

		return selectedAvatar;
	}

	const handlePersonalAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target.files && e.target.files[0];

		if (!file) return;
		if (file) {
			const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
			if (allowedImageTypes.includes(file.type)) {
				if (file.size <= maxFileSize * maxFileSize) {
					readImage(file);
				}
			}
		}
	};

	const handleTemplateAvatarChange = (defaultAvatarTitle: string) => {
		setSelectedDefaultAvatar(defaultAvatarTitle);
		setValue("personalAvatar", "");
	};

	return (
		<form className={styles.avatarForm} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.avatarForm__title}>Аватар</p>

			<div className={styles.avatarSettingsWrap}>
				<div className={styles.avatar__wrapper}>
					<div className={styles.avatar__picture}>
						<NextImage
							src={getSelectedAvatarSource()}
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
									onChange={handlePersonalAvatarChange}
								/>
								<NextImage src={editProfileIcon} alt="editProfile" className={styles.avatar__editIcon} />
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
								value={`templateAvatar${index + 1}`}
								{...register("templateAvatar")}
								className={styles.templateAvatar__input}
							/>
							<label
								htmlFor={`template-avatar-${index}`}
								className={cn(styles.templateAvatar__label, {
									[styles.templateAvatar__label_active]: selectedDefaultAvatar === `templateAvatar${index + 1}`,
								})}
								onClick={() => handleTemplateAvatarChange(`templateAvatar${index + 1}`)}>
								<NextImage src={avatar} className={styles.avatarTemplates__img} alt="" width={50} height={50} />
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
