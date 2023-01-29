import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import { NUMBER_OF_POSTS_PER_PAGE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import '../styles/page.module.css'
import '../styles/profile-link.css'
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
      <div className="mv">
        <div className="mv_chara"></div>
      </div>
      <div className={styles.container} >
        <div className="col1">
          <div className="sec_profile">
            <ul className="profile_list">
              <li>
                <a className="profile_list_item twitter" href='https://twitter.com/bankas_web' target="_blank">
                  <p className="text"><span>MAIN</span><br></br>Twitter</p>
                </a>
              </li>
              <li>
                <a className="profile_list_item blogwp" href='https://sakuttobankas.com/' target="_blank">
                  <p className="text"><span>BLOG</span><br></br>WordPress</p>
                </a>
              </li>
              <li>
                <a className="profile_list_item webwp" href='https://web.sakuttobankas.com/' target="_blank" >
                  <p className="text"><span>WEB</span><br></br>WordPress</p>
                </a>
              </li>
              <li>
                <a className="profile_list_item github" href='https://github.com/bankasss' target="_blank" >
                  <p className="text"><span>STUDY</span><br></br>GitHub</p>
                </a>
              </li>
            </ul>
          </div>
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
                  <hr className="hr-top"></hr>
                </div>
              )
            })}
          </section>
        </div>
        
      </div>
    </>
  )
}

export default BlogPage