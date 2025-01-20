"use client";

import { useRouter } from "next/navigation";

import Footer from "../../../components/mainLayout/footer/footer";
import BlogCard from "../../../components/mainLayout/blogCard/blogCard";
import { InputTypeList } from "../../../helpers/Input";

import moneyFlower from "../../../assets/pages/blog/moneyFlower.webp";
import notebook from "../../../assets/pages/blog/notebook.webp";
import workEnvironment from "../../../assets/pages/blog/workEnvironment.webp";
import { ArrowRightIcon } from "../../../assets/script/blog/ArrowRightIcon";
import { ArrowLeftIcon } from "../../../assets/script/blog/ArrowLeftIcon";

import { MainPath } from "../../../services/router/routes";

import styles from "./blog.module.scss";

export default function Blog() {
	const router = useRouter();

	const transitionList = {
		firstTransition: () => {
			router.push(MainPath.BlogPage + "/1");
		},
		secondTransition: () => {
			router.push(MainPath.BlogPage + "/2");
		},
		thirdTransition: () => {
			router.push(MainPath.BlogPage + "/3");
		},
	};

	return (
		<div className={styles.blogWrap}>
			<div className={styles.blogContainer}>
				<div className={styles.blogHeaderWrap}>
					<h1 className={styles.blogHeaderWrap__title}>
						Здесь вы найдете свежие новости о нашем приложении и интересные статьи по учету собственных финансов
					</h1>
					<div className={styles.buttonsArrowsWrap}>
						<button className={styles.buttonsArrow} type={InputTypeList.Button}>
							<ArrowLeftIcon classNames={styles.buttonsArrowIcon} />
						</button>
						<button className={styles.buttonsArrow} type={InputTypeList.Button}>
							<ArrowRightIcon classNames={styles.buttonsArrowIcon} />
						</button>
					</div>
				</div>
				<div className={styles.blogCardsContainer}>
					<div className={styles.blogCardsSlider}>
						<BlogCard
							image={moneyFlower}
							date="06 июня 2024"
							descriptionImage="money flower"
							text="5 шагов к успешному управлению личными финансами с помощью приложения"
							blogAction={transitionList.firstTransition}
							id="1"
						/>
						<BlogCard
							image={notebook}
							date="06 июня 2024"
							descriptionImage="notebook"
							text={"Плюсы и минусы автоматизации учета финансов при помощи приложений"}
							blogAction={transitionList.secondTransition}
							id="2"
						/>
						<BlogCard
							image={workEnvironment}
							date="04 июня 2024"
							descriptionImage="wok environment"
							text="Какие ошибки чаще всего допускают пользователи при использовании приложений для учета финансов и как их избежать"
							blogAction={transitionList.thirdTransition}
							id="3"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
