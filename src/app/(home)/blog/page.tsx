"use client";

import { useRouter } from "next/navigation";

import Footer from "../../../components/mainLayout/footer/footer";
import BlogCard from "../../../components/mainLayout/blogCard/blogCard";

import moneyFlower from "../../../assets/pages/blog/moneyFlower.png";
import notebook from "../../../assets/pages/blog/notebook.png";
import workEnvironment from "../../../assets/pages/blog/workEnvironment.png";
import { ArrowRightIcon } from "../../../assets/script/blog/ArrowRightIcon";
import { ArrowLeftIcon } from "../../../assets/script/blog/ArrowLeftIcon";

import { MainPath } from "../../../services/router/routes";

import style from "./blog.module.scss";

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
		<div className={style.blogWrap}>
			<div className={style.blogContainer}>
				<div className={style.blogHeaderWrap}>
					<h1 className={style.blogHeaderWrap__title}>
						Здесь вы найдете свежие новости о нашем приложении и интересные статьи по учету собственных финансов
					</h1>
					<div className={style.buttonsArrowsWrap}>
						<button className={style.buttonsArrow} type="button">
							<ArrowLeftIcon classNames={style.buttonsArrowIcon} />
						</button>
						<button className={style.buttonsArrow} type="button">
							<ArrowRightIcon classNames={style.buttonsArrowIcon} />
						</button>
					</div>
				</div>
				<div className={style.blogCardsContainer}>
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
				<Footer />
			</div>
		</div>
	);
}
