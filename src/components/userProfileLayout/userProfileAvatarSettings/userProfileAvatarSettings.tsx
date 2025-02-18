import { useForm } from "react-hook-form";
import Image from "next/image";

import { IUserAvatar } from "../../../types/pages/userProfileSettings";
import { InputTypeList } from "../../../helpers/Input";
import { avatarTemplates } from "../../../mocks/AvatarTemplates";

import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";
import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./userProfileAvatarSettings.module.scss";

export const UserProfileAvatarSettings = () => {
	const { register } = useForm<IUserAvatar>({
		mode: "all",
		delayError: 200,
	});

	return (
		<form className={styles.avatarForm}>
			<p className={styles.avatarForm__title}>Аватар</p>
			<div className={styles.avatarSettingsWrap}>
				<div className={styles.avatar__wrapper}>
					<div className={styles.avatar__picture}>
						<Image src={userAvatar} alt={"userAvatar"} className={styles.avatar__image} />
						<div className={styles.avatar__editButtonWrapper}>
							<label htmlFor="userAvatar" className={styles.avatar__editButton}>
								<input
									type={InputTypeList.File}
									id="userAvatar"
									className={styles.avatar__input}
									{...register("personalAvatar")}
								/>
								<Image src={editProfileIcon} alt={"editProfile"} className={styles.avatar__editIcon} />
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
								<Image src={avatar} className={styles.avatarTemplates__img} alt={""} />
							</label>
						</div>
					))}
				</div>
			</div>
			<Button variant={ButtonType.Outlined} type={"submit"}>
				Сохранить
			</Button>
		</form>
	);
};
