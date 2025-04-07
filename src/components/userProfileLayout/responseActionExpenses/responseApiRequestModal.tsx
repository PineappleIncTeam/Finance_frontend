import cn from "classnames";

import { IResponseApiRequestModal } from "../../../types/common/ComponentsProps";

import styles from "./responseApiRequestModal.module.scss";

export const ResponseApiRequestModal = ({ open, title, width }: IResponseApiRequestModal) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={cn(styles.modalContainer)} style={{ width }}>
				<p className={styles.modalContainer__title}>{title}</p>
			</div>
		</dialog>
	);
};
