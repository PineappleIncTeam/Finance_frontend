"use client";

import { useParams, useRouter } from "next/navigation";

import BlogArticle from "../../../../components/mainLayout/blogArticle/blogArticle";
import Footer from "../../../../components/mainLayout/footer/footer";

import { ArrowLeftIcon } from "../../../../assets/script/blogPage/ArrowLeft";

import { blogArticles } from "../../../../mocks/BlogArticles";

import style from "./blogPage.module.scss";

function BlogPage() {
	const router = useRouter();
	const params = useParams();

	const blogArticleData = blogArticles[+params.blogPageId - 1];

	return (
		<div className={style.BlogPageWrap}>
			<div className={style.BlogPageContainer}>
				<div className={style.BlogPageButtonLeftWrapper}>
					<button className={style.BlogPageButtonLeft} type="button" onClick={() => router.back()}>
						<ArrowLeftIcon classNames={style.BlogPageArrowLeftIcon} />
						Все статьи
					</button>
				</div>
				<div>
					<BlogArticle
						image={blogArticleData.image}
						date={blogArticleData.date}
						title={blogArticleData.title}
						articleContent={blogArticleData.articleContent}
						id={blogArticleData.id}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default BlogPage;
