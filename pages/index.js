"use client"
import Head from 'next/head';
import Layout, { siteTitle } from "../public/components/layout"
import utilStyles from "../styles/utils.module.css"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RouteAuthGuard from '../public/components/route-auth-guard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PostMiddleWare } from '../middleware/post';
import postServices from '../services/post';
import { getPosts, selectAllPosts } from '../slices/postSlice';
import localStorageServices from '../helpers/local-storage-services';

export async function getStaticProps() {
  const response = await postServices.getAllPost().then((value) => { return value.data })
  return {
    props: {
      response
    }
  };
}

function Home({ response }) {
  const router = useRouter();
 
  const allPostsData = useSelector(selectAllPosts)
  
  const dispatch = useDispatch()
  
  // useEffect(() => {
  //   const user = localStorageServices.getValue()
  //   if (!user) {
  //     router.push("/login")
  //   }
  // }, [])

  useEffect(() => {
    if (!Object.keys(allPostsData).length > 0) {
      dispatch(getPosts(response))
      // dispatch(PostMiddleWare())
    }
    const user = localStorageServices.getValue()
    if (!user) {
      router.push("/login")
    }
  }, [response])

  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <button onClick={() => router.push("/comments")}>Add post</button>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map((item) => (
            <li className={utilStyles.listItem} key={item.id}>
              <Link href={`/posts/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
 }

export default RouteAuthGuard(Home)