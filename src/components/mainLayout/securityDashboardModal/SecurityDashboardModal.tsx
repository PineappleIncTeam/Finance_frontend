"use client";

import Link from "next/link";

import { useLockScroll } from "../../../hooks/useLockScroll";
import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";

import { ISecurityDashboardModal } from "../../../types/common/ComponentsProps";
import { mockBaseUrl } from "../../../mocks/envConsts";

import {
	HttpsIcon,
	DependencyIcon,
	HeadersIcon,
	PermissionsIcon,
	EncryptionIcon,
	PrivacyIcon,
	CloseIcon,
} from "../../../assets/script/security/SecurityIcons";

import styles from "./securityDashboardModal.module.scss";

const SecurityDashboardModal = ({ isOpen, onClose }: ISecurityDashboardModal) => {
	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);
	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);

	useLockScroll(isOpen);

	const securityDashboardLinks = {
		ssllabsLink: `https://www.ssllabs.com/ssltest/analyze.html?d=${baseUrl}`,
		securityHeadersLink: `https://securityheaders.com/?q=${baseUrl}&followRedirects=on`,
	};

	if (!isOpen) return null;

	return (
		<dialog open={isOpen} className={styles.backgroundModal} onClick={onClose}>
			<div className={styles.modalContainer} onClick={(e) => e.stopPropagation()} role="textbox">
				<button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
					<CloseIcon />
				</button>

				<header className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>Панель безопасности</h2>
				</header>

				<div className={styles.modalContent}>
					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Внешняя безопасность</h3>
						<div className={styles.securityGrid}>
							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<HttpsIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Статус HTTPS/SSL соединения</h4>
									<p className={styles.itemDescription}>
										Все данные передаются по защищенному протоколу HTTPS. Наш SSL-сертификат имеет высший рейтинг
										безопасности (A+).
									</p>
									<a
										href={securityDashboardLinks.ssllabsLink}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.externalLink}>
										Проверить на SSL Labs →
									</a>
								</div>
							</div>

							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<HeadersIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Статус заголовков безопасности</h4>
									<p className={styles.itemDescription}>
										Настроены HTTP-заголовки безопасности (CSP, HSTS, X-Frame-Options) для защиты от XSS-атак и
										кликджекинга.
									</p>
									<a
										href={securityDashboardLinks.securityHeadersLink}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.externalLink}>
										Проверить заголовки →
									</a>
								</div>
							</div>

							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<DependencyIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Проверка зависимостей</h4>
									<p className={styles.itemDescription}>
										Код проверен на наличие 0 уязвимостей. Мы регулярно сканируем все сторонние библиотеки через GitHub
										Advisory Database и Dependabot.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Внутренняя безопасность</h3>
						<div className={styles.securityGrid}>
							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<PermissionsIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Контроль разрешений</h4>
									<p className={styles.itemDescription}>
										Приложение не запрашивает доступ к камере, микрофону, геолокации или контактам. Мы уважаем ваше
										личное пространство.
									</p>
								</div>
							</div>

							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<EncryptionIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Шифрование данных</h4>
									<p className={styles.itemDescription}>
										Для защиты всех передаваемых данных используется современный протокол шифрования TLS 1.3,
										исключающий возможность перехвата.
									</p>
								</div>
							</div>

							<div className={styles.securityItem}>
								<div className={styles.iconWrapper}>
									<PrivacyIcon />
								</div>
								<div className={styles.itemInfo}>
									<h4 className={styles.itemTitle}>Политика конфиденциальности</h4>
									<p className={styles.itemDescription}>
										Мы собираем только минимально необходимые данные для работы приложения. Узнайте больше в нашей
										политике конфиденциальности.
									</p>
									<Link href="/privacyPolicy" className={styles.privacyLink}>
										Читать политику
									</Link>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</dialog>
	);
};

export default SecurityDashboardModal;
