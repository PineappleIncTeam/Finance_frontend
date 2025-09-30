"use client";

import Image from "next/image";
import { useState } from "react";

import { useCurrentLinkCard } from "../../../hooks/useCurrentLinkCard";

import { IBlogArticle } from "../../../types/common/ComponentsProps";
import { BlogArticleShareTooltip } from "../blogArticleShareTooltip/blogArticleShareTooltip";
import { InputTypeList } from "../../../helpers/Input";

import { ShareIcon } from "../../../assets/script/blogArticle/ShareIcon";

import mockImage from "../../../mocks/images/blogArticleMock.webp";

import styles from "./blogArticle.module.scss";

export default function BlogArticle({ image, date, title, articleContent, id }: IBlogArticle) {
	const [isArticleShareTooltipOpen, setIsArticleShareTooltipOpen] = useState<boolean>(false);

	const shared = useCurrentLinkCard();

	const numberSeconds = 1500;

	const renderTooltip = () => {
		setIsArticleShareTooltipOpen(true);
		return setTimeout(() => setIsArticleShareTooltipOpen(false), numberSeconds);
	};

	const clickShare = () => {
		shared(id || "");
		renderTooltip();
	};

	return (
		<div className={styles.blogArticleContainer}>
			<div className={styles.blogArticleContent}>
				<div className={styles.blogArticleHeaderWrapper}>
					<Image className={styles.blogArticleImage} src={image ?? mockImage} alt="descriptionImage" priority={true} />
					<div className={styles.blogArticleTitleWrapper}>
						<div className={styles.blogArticleDateShareLinkWrapper}>
							<p className={styles.blogArticleDate}>{date}</p>
							{isArticleShareTooltipOpen && <BlogArticleShareTooltip open={isArticleShareTooltipOpen} />}
							<button
								type={InputTypeList.Button}
								className={styles.blogArticleShareIconWrap}
								onClick={() => {
									clickShare();
								}}>
								<ShareIcon classNames={styles.blogArticleShareIcon} />
							</button>
						</div>
						<h1 className={styles.blogArticleTitle}>{title}</h1>
					</div>
				</div>
				{articleContent.map((paragraphContent, index) => (
					<li key={index}>
						<p className={styles.blogArticleText}>{paragraphContent}</p>
					</li>
				))}
			</div>
		</div>
	);
}
