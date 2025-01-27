"use client";

import Image from "next/image";

import useCurrentLinkCard from "../../../hooks/useCurrentLinkCard";

import { IBlogCard } from "../../../types/common/ComponentsProps";
import { InputTypeList } from "../../../helpers/Input";

import { ArrowRightSmallIcon } from "../../../assets/script/blog/ArrowRightSmallIcon";
import { ShareIcon } from "../../../assets/script/blog/ShareIcon";

import styles from "./blogCard.module.scss";

const BlogCard = ({ image, date, descriptionImage, text, blogAction, id }: IBlogCard) => {
	const shared = useCurrentLinkCard();

	return (
		<div className={styles.blogCardContainer}>
			<div className={styles.blogCardPicture}>
				<Image className={styles.blogCardImage} src={image} alt={descriptionImage} />
				<button type={InputTypeList.Button} onClick={() => shared(id ?? "")} className={styles.blogCardShareButton}>
					<ShareIcon classNames={styles.blogCardShareButtonIcon} />
				</button>
			</div>
			<div className={styles.blogCardInfo}>
				<div className={styles.blogCardDate}>{date}</div>
				<div className={styles.blogCardText}>{text}</div>
				<div className={styles.blogCardButtonWrap}>
					<button className={styles.blogCardButton} type={InputTypeList.Button} onClick={blogAction}>
						<div>Подробнее</div>
						<div className={styles.blogCardArrow}>
							<ArrowRightSmallIcon classNames={styles.blogArrow} />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
