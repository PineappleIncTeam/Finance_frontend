"use client";

import { useParams, useRouter } from "next/navigation";

import BlogArticle from "../../../../components/mainLayout/blogArticle/blogArticle";
import Footer from "../../../../components/mainLayout/footer/footer";
import { InputTypeList } from "../../../../helpers/Input";

import { ArrowLeftIcon } from "../../../../assets/script/blogPage/ArrowLeft";

import { blogArticles } from "../../../../mocks/BlogArticles";

import styles from "./blogPage.module.scss";

function BlogPage() {
	const router = useRouter();
	const params = useParams();

	const blogArticleData = blogArticles[+(params?.blogPageId ?? 2) - 1];

	return (
		<div className={styles.blogPageWrap}>
			<div className={styles.blogPageContainer}>
				<div className={styles.blogPageButtonLeftWrapper}>
					<button className={styles.blogPageButtonLeft} type={InputTypeList.Button} onClick={() => router.back()}>
						<ArrowLeftIcon classNames={styles.blogPageArrowLeftIcon} />
						Все статьи
					</button>
				</div>
				<BlogArticle
					image={blogArticleData.image}
					date={blogArticleData.date}
					title={blogArticleData.title}
					articleContent={blogArticleData.articleContent}
					id={blogArticleData.id}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default BlogPage;
