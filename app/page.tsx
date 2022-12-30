import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import { NUMBER_OF_POSTS_PER_PAGE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import '../styles/page.module.css'
import styles from '../styles/blog.module.css'
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
} from '../components/blog-parts'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../lib/notion/client'

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
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />

      <div className={styles.container} >
        <div className="col1">
          <section className="sec_info">
            <h2 className="content_title content_title-info">INFO</h2>
            <NoContents contents={posts} />

            {posts.map(post => {
              return (
                <div className={styles.post + ' post-top'} key={post.Slug}>
                  <div className="col2">
                    <PostDate post={post} />
                    <PostTags post={post} />
                  </div>
                  <PostTitle post={post} />
                  {/*<PostExcerpt post={post} />>*/}
                  {/*<ReadMoreLink post={post} />*/}
                  <hr className="hr-top"></hr>
                </div>
              )
            })}

            {/*
            <footer>
              <NextPageLink firstPost={firstPost} posts={posts} />
            </footer>
            */}
          </section>

           {/*
          <section className="sec_link">
            <h2 className="content_title content_title-link">LINK</h2>

          </section>
          */}
        </div>
        
        {/*
        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
        */}
      </div>
    </>
  )
}

export default BlogPage