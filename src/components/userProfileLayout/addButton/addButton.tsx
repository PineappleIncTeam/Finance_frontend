import cn from "classnames";

import { IAddButton } from "../../../types/common/UiKitProps";

import styles from "./addButton.module.scss";

const AddButton = ({ children, onClick, type, className, ...props }: IAddButton) => {
	return (
		<button className={cn(styles.button, className)} onClick={onClick} type={type} {...props}>
			<span className={styles.buttonText}>{children ? children : "Добавить"}</span>
		</button>
	);
};

export default AddButton;
