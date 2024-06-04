import React, { FormEventHandler } from "react";

import { LetterIcon } from "../../../assets/pages/changePassword/LetterIcon";

import { PaperAirLineIcon } from "../../../assets/pages/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/pages/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/pages/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/pages/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/pages/changePassword/EmailIcon";

import { OvalIcon } from "../../../assets/pages/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/pages/changePassword/ManIcon";

import style from "./newPassword.module.scss";

export default function newPassword(NewPasswordProps: { onSubmit: FormEventHandler<HTMLFormElement> }) {
	return (
		<div className={style.newPasswordWrap}>
			<div className={style.newPasswordContainer}>
				<OvalIcon classNames={style.ovalIcon} />
				<QuestionIcon classNames={style.questionIcon} />
				<EmailIcon classNames={style.emailIcon} />
				<ArrowsIcon classNames={style.arrowsIcon} />
				<LetterIcon classNames={style.letterIcon} />
				<OpenLetterIcon classNames={style.openLetterIcon} />
				<ManIcon classNames={style.manIcon} />
				<PaperAirLineIcon classNames={style.paperAirLineIcon} />
				<OpenLetterIcon classNames={style.secondOpenLetterIcon} />
				<div className={style.newPasswordContainer__modal}>
					<div className={style.newPasswordContainer__modal__content}>
						<h1 className={style.newPasswordContainer__form__title}>Восстановление пароля</h1>
						<form onSubmit={NewPasswordProps.onSubmit}>
							<label className={style.label}>
								Введите почту
								<input className={style.newPasswordRow} placeholder="_@_._" />
							</label>
							<div className={style.newPassword__modal__buttons}>
								<input className={style.backButton} type="submit" value="Назад" />
								<input className={style.restoreButton} type="submit" value="Восстановить" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
