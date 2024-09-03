"use client";

import Image from "next/image";

import useCurrentLinkCard from "../../../hooks/useCurrentLinkCard";

import { IBlogCard } from "../../../types/common/ComponentsProps";

import { ArrowRightSmallIcon } from "../../../assets/script/blog/ArrowRightSmallIcon";
import { ShareIcon } from "../../../assets/script/blog/ShareIcon";

import style from "./blogCard.module.scss";

const BlogCard = ({ image, date, descriptionImage, text, blogAction, id }: IBlogCard) => {
	const shared = useCurrentLinkCard();

	return (
		<div className={style.blogCardContainer}>
			<Image className={style.blogCardImage} src={image} alt={descriptionImage} />
			<button type="button" onClick={() => shared(id ?? "")}>
				<ShareIcon classNames={style.blogCardShareButton} />
			</button>
			<p className={style.blogCardDate}>{date}</p>
			<p className={style.blogCardText}>{text}</p>
			<div className={style.blogCardButtonWrap}>
				<button className={style.blogCardButton} type="button" onClick={blogAction}>
					Подробнее <ArrowRightSmallIcon classNames={style.blogCardArrow} />
				</button>
			</div>
		</div>
	);
};

export default BlogCard;
