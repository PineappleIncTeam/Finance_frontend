import { useForm } from "react-hook-form";

import Image from "next/image";

import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";

import { IUserAvatar } from "../../../types/pages/userProfileSettings";
import Button from "../../../ui/button/button";

import { avatarTemplates } from "../../../mocks/AvatarTemplates";

import styles from "./userProfileAvatarSettings.module.scss";

export const UserProfileAvatarSettings = () => {
	const { register } = useForm<IUserAvatar>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={styles.avatarForm}>
			<p className={styles.avatarTitle}>Аватар</p>
			<div className={styles.avatarForm__settings}>
				<div className={styles.avatar__wrapper}>
					<div className={styles.avatar__picture}>
						<Image src={userAvatar} alt={"userAvatar"} className={styles.avatar__image} />
						<div className={styles.avatar__editButtonWrapper}>
							<label htmlFor="userAvatar" className={styles.avatar__editButton}>
								<input type="file" id="userAvatar" className={styles.avatar__input} {...register("personalAvatar")} />
								<Image src={editProfileIcon} alt={"editProfile"} className={styles.avatar__editIcon} />
							</label>
						</div>
					</div>
				</div>
				<div className={styles.avatarTemplates}>
					{avatarTemplates.map((avatar, index) => (
						<div className={styles.avatarTemplates__picture} key={index}>
							<input
								type="radio"
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
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
