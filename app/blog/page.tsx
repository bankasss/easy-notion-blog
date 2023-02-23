import { NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'

export const revalidate = 60

const BlogPage = async () => {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <NoContents contents={posts} />

          {posts.map(post => {
            return (
              <div className={styles.post + 'mb30'} key={post.Slug}>
                <div className="col2 mb10">
                  <PostDate post={post}/>
                  <PostTags post={post}/>
                </div>
                <PostTitle post={post}/>
                <hr className="divider mt10"></hr>
              </div>
            )
          })}
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="最近の投稿" posts={rankedPosts} />
          <BlogTagLink heading="カテゴリ" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogPage
