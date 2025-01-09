"use client";

import Image from "next/image";

import useCurrentLinkCard from "../../../hooks/useCurrentLinkCard";

import { IBlogCard } from "../../../types/common/ComponentsProps";
import { InputTypeList } from "../../../helpers/Input";

import { ArrowRightSmallIcon } from "../../../assets/script/blog/ArrowRightSmallIcon";
import { ShareIcon } from "../../../assets/script/blog/ShareIcon";

import style from "./blogCard.module.scss";

const BlogCard = ({ image, date, descriptionImage, text, blogAction, id }: IBlogCard) => {
	const shared = useCurrentLinkCard();

	return (
		<div className={style.blogCardContainer}>
			<div className={style.blogCardPicture}>
				<Image className={style.blogCardImage} src={image} alt={descriptionImage} />
				<button type={InputTypeList.Button} onClick={() => shared(id ?? "")} className={style.blogCardShareButton}>
					<ShareIcon classNames={style.blogCardShareButtonIcon} />
				</button>
			</div>
			<div className={style.blogCardInfo}>
				<div className={style.blogCardDate}>{date}</div>
				<div className={style.blogCardText}>{text}</div>
				<div className={style.blogCardButtonWrap}>
					<button className={style.blogCardButton} type={InputTypeList.Button} onClick={blogAction}>
						<div>Подробнее</div>
						<div className={style.blogCardArrow}>
							<ArrowRightSmallIcon classNames={style.blogArrow} />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
