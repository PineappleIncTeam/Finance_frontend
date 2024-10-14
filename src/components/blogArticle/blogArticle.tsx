"use client";

import Image from "next/image";

import { useState } from "react";

import { IBlogArticle } from "../../types/common/ComponentsProps";

import useCurrentLinkCard from "../../hooks/useCurrentLinkCard";

import { ShareIcon } from "../../assets/script/blogArticle/ShareIcon";

import { BlogArticleShareTooltip } from "../blogArticleShareTooltip/blogArticleShareTooltip";

import style from "./blogArticle.module.scss";

export default function BlogArticle({ image, date, title, articleContent, id }: IBlogArticle) {
	const [isArticleShareTooltipShown, setIsArticleShareTooltipShown] = useState(false);

	const shared = useCurrentLinkCard();

	const numberSeconds = 1500;

	const tooltip = () => {
		setIsArticleShareTooltipShown(true);
		return setTimeout(() => setIsArticleShareTooltipShown(false), numberSeconds);
	};

	const clickShare = () => {
		shared(id || "");
		tooltip();
	};

	return (
		<div className={style.BlogArticleContainer}>
			<div className={style.BlogArticleContent}>
				<div className={style.BlogArticleHeaderWrapper}>
					<Image
						className={style.BlogArticleImage}
						src={typeof image === "string" ? image : image.src || ""}
						alt="descriptionImage"
					/>
					<div className={style.BlogArticleTitleWrapper}>
						<p className={style.BlogArticleDate}>{date}</p>
						<button
							type="button"
							className={style.BlogArticleShareIconWrap}
							onClick={() => {
								clickShare();
							}}>
							<ShareIcon classNames={style.BlogArticleShareIcon} />
						</button>
						<BlogArticleShareTooltip open={isArticleShareTooltipShown} />
						<h1 className={style.BlogArticleTitle}>{title}</h1>
					</div>
				</div>
				{articleContent.map((paragraphContent, index) => (
					<li key={index}>
						<p className={style.BlogArticleText}>{paragraphContent}</p>
					</li>
				))}
			</div>
		</div>
	);
}
