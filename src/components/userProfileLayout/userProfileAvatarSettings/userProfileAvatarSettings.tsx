import { useForm } from "react-hook-form";

import Image from "next/image";

import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";

import { IUserAvatar } from "../../../types/pages/userProfileSettings";
import Button from "../../../ui/button/button";

import { AvatarTemplates } from "../../../mocks/AvatarTemplates";

import style from "./userProfileAvatarSettings.module.scss";

export const AvatarSettings = () => {
	const { register } = useForm<IUserAvatar>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={style.form}>
			<div className={style.title}>Аватар</div>
			<div className={style.form__settings}>
				<div className={style.avatar__wrapper}>
					<div className={style.avatar__picture}>
						<Image src={userAvatar} alt={"userAvatar"} className={style.avatar__image} />
						<div className={style.avatar__editButtonWrapper}>
							<label htmlFor="userAvatar" className={style.avatar__editButton}>
								<input type="file" id="userAvatar" className={style.avatar__input} {...register("personalAvatar")} />
								<Image src={editProfileIcon} alt={"editProfile"} className={style.avatar__editIcon} />
							</label>
						</div>
					</div>
				</div>
				<div className={style.avatarTemplates}>
					{AvatarTemplates.map((avatar, index) => (
						<div className={style.avatarTemplates__picture} key={index}>
							<input
								type="radio"
								id={`template-avatar-${index}`}
								value={avatar}
								{...register("templateAvatar")}
								className={style.templateAvatar__input}
							/>
							<label htmlFor={`template-avatar-${index}`} className={style.templateAvatar__label}>
								<Image src={avatar} className={style.avatarTemplates__img} alt={""} />
							</label>
						</div>
					))}
				</div>
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
