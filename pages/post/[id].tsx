
import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router' ;
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import {PostType, Comments} from '../../types'



const Post: NextPage<{post:PostType, comments:Comments[] }> = ({post, comments} ) => {
    
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.body}</p>
      <div className={styles.comments}>
          <h4 className={styles.center}>Comments</h4>
          {comments.map((data : Comments)=>(
            <div key={data.id}>
              <div className='flex'>
                <span className={styles.name}>{data.name}</span>
                <span className={styles.email}>{data.email}</span>
              </div>
              <p className={styles.sm}>{data.body}</p>
              <hr/>
            </div>
          ))}
      </div>
    </div>
  )
}
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts : PostType[] = await res.json();
    const paths = posts.map((post : PostType) =>{
      return {
        params: {id : post.id.toString()}
      }
    })
    return  { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params?.id}`);
  const post : PostType = await res.json()
  const resC = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params?.id}/comments`)
  const comments : Comments[] = await resC.json()
  
  return {
    props: {
      post,
      comments
    },
  }
}