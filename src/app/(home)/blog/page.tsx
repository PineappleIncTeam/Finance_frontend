"use client";

import { useRouter } from "next/navigation";

import moneyFlower from "../../../assets/pages/blog/moneyFlower.png";
import notebook from "../../../assets/pages/blog/notebook.png";
import workEnvironment from "../../../assets/pages/blog/workEnvironment.png";

import Footer from "../../../pages/homeLayout/footer/footer";

import { BlogCard } from "../../../components/blogCard/blogCard";

import { ArrowRightIcon } from "../../../assets/script/blog/ArrowRightIcon";
import { ArrowLeftIcon } from "../../../assets/script/blog/ArrowLeftIcon";

import style from "./blog.module.scss";

export default function Blog() {
	const router = useRouter();

	const transitionMainPage = () => {
		router.push("/");
	};

	return (
		<div className={style.blogWrap}>
			<div className={style.blogContainer}>
				<div className={style.blogContainer__header}>
					<h1 className={style.blogContainer__title}>
						Здесь вы найдете свежие новости о нашем приложении и интересные статьи по учету собственных финансов
					</h1>
					<div className={style.buttonsArrowsWrap}>
						<ArrowLeftIcon classNames={style.buttonsArrowIcon} />
						<ArrowRightIcon classNames={style.buttonsArrowIcon} />
					</div>
				</div>
				<div className={style.blogCardsContainer}>
					<BlogCard
						image={moneyFlower}
						date="06 июня 2024"
						descriptionImage="money flower"
						text="5 шагов к успешному управлению личными финансами с помощью приложения"
						click={transitionMainPage}
						id="12"
					/>
					<BlogCard
						image={notebook}
						date="06 июня 2024"
						descriptionImage="notebook"
						text={"Плюсы и минусы автоматизации учета финансов при помощи приложений"}
						click={transitionMainPage}
						id="123"
					/>
					<BlogCard
						image={workEnvironment}
						date="04 июня 2024"
						descriptionImage="wok environment"
						text="Какие ошибки чаще всего допускают пользователи при использовании приложений для учета финансов и как их избежать"
						click={transitionMainPage}
						id="1234"
					/>
				</div>
				<Footer />
			</div>
		</div>
	);
}
