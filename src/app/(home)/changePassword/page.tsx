import React, { FormEventHandler } from "react";

import { LetterIcon } from "../../../assets/pages/changePassword/LetterIcon";

import { PaperAirLineIcon } from "../../../assets/pages/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/pages/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/pages/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/pages/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/pages/changePassword/EmailIcon";

import style from "./changePassword.module.css";
import { OvalIcon } from "../../../assets/pages/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/pages/changePassword/ManIcon";

// interface ChangePasswordProps {
// 	onSubmit: () => void;
// }

export default function changePassword(ChangePasswordProps: { onSubmit: FormEventHandler<HTMLFormElement> }) {
	return (
		<div className={style.changePasswordWrap}>
			<div className={style.changePasswordContainer}>
				<OvalIcon classNames={style.ovalIcon}/>
				<QuestionIcon classNames={style.questionIcon} />
				<EmailIcon classNames={style.emailIcon} />
				<ArrowsIcon classNames={style.arrowsIcon}/>
				<LetterIcon classNames={style.letterIcon}/>
				<OpenLetterIcon classNames={style.openLetterIcon} />
				<ManIcon classNames={style.man}/>
				<PaperAirLineIcon classNames={style.paperAirLineIcon} />
				<div className={style.changePasswordContainer__modal}>
				<div className={style.changePasswordContainer__form}>
					<h1 className={style.changePasswordContainer__form__title}>Изменение пароля</h1>
					<form onSubmit={ChangePasswordProps.onSubmit}>
						<label className={style.label}>
							Введите новый пароль
							<input className={style.changePasswordRow} placeholder="Пароль" />
						</label>
						<p className={style.changePasswordHelper}>
							Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя
							бы одна цифра
						</p>
						<label className={style.label}>
							Повторите пароль
							<input className={style.changePasswordRow} placeholder="Пароль" />
						</label>
						<input className={style.saveButton} type="submit" value="Сохранить" />
					</form>
				</div>
				</div>				
			</div>
		</div>
	);
}
