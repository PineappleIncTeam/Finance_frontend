import { BlogArticle } from "../../../components/blogArticle/blogArticle";
import { blogArticles } from "../../../mocks/BlogArticles";
import moneyFlower from "../../../assets/pages/blogArticle/moneyFlower.png";
import Footer from "../../../pages/homeLayout/footer/footer";
import { ArrowLeftIcon } from "../../../assets/script/blogPage/ArrowLeft";

import style from "./blogPage.module.scss";

export default function BlogPage() {
	return (
		<div className={style.BlogPageWrap}>
			<div className={style.BlogPageContainer}>
				<div className={style.BlogPageButtonLeftWrapper}>
					<button className={style.BlogPageButtonLeft} type="button">
						<ArrowLeftIcon classNames={style.BlogPageArrowLeftIcon} />
						Все статьи
					</button>
				</div>
				{blogArticles.map((article) => (
					<ol key={article.id}>
						<BlogArticle
							image={moneyFlower}
							date={article.date}
							title={article.title}
							articleContent={article.articleContent}
							id={article.id}
						/>
					</ol>
				))}
			</div>
			<Footer />
		</div>
	);
}
