import Image from "next/image";

import { IInviteModal } from "../../../types/components/ComponentsTypes";

import inviteLogo from "../../../assets/components/inviteModal/inviteIcon.png";

import styles from "./inviteModal.module.scss";

const InviteModal = ({ isOpen, onClose }: IInviteModal) => {
	return (
		<>
			{isOpen && (
				<div className={styles.overlay} onClick={onClose} role="alert">
					<div className={styles.modal}>
						<Image src={inviteLogo} alt={"logo"} className={styles.modalLogo} />
						<h2 className={styles.modalTitle}>Добро пожаловать!</h2>
						<h3 className={styles.modalText}>Начните планировать свои финансы с нами прямо сейчас.</h3>
					</div>
				</div>
			)}
		</>
	);
};

export default InviteModal;
