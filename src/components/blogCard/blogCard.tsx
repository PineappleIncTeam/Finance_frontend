"use client";

import Image from "next/image";

import { IBlogCard } from "../../types/common/ComponentsProps";
import { ArrowRightSmallIcon } from "../../assets/script/blog/ArrowRightSmallIcon";

import shareIcon from "../../assets/pages/blog/share.png";

import useCurrentLinkCard from "../../hooks/useCurrentLinkCard";

import style from "./blogCard.module.scss";

export const BlogCard = ({ image, date, descriptionImage, text, click, id }: IBlogCard) => {
	const shared = useCurrentLinkCard();

	return (
		<div className={style.blogCardContainer}>
			<Image className={style.blogCardImage} src={image} alt={descriptionImage} />
			<button type="button" onClick={() => shared(id)}>
				<Image className={style.blogCardShareButton} src={shareIcon} alt={descriptionImage} />
			</button>
			<p className={style.blogCardDate}>{date}</p>
			<p className={style.blogCardText}>{text}</p>
			<div className={style.blogCardButtonWrap}>
				<button className={style.blogCardButton} type="button" onClick={click}>
					Подробнее <ArrowRightSmallIcon classNames={style.blogCardArrow} />
				</button>
			</div>
		</div>
	);
};
