import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {PostType} from '../types'

const Home: NextPage<{posts : PostType[]}> = ({posts}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.head}>Blog Posts</h1>
      <ul className={styles.grid}>
      {posts.map((post:PostType) => (
          <Link href={`/post/${post.id}`} key={post.id} >
            <li className={styles.card}>
              <h3>{post.title}</h3>
              <p>
                {post.body}
              </p>
            
            </li>
          </Link>
        ))}
      </ul>
    
     </div>
       
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts : PostType[] = await res.json(); 
  return {
    props: {
      posts,
    },
  }
}


export default Home
