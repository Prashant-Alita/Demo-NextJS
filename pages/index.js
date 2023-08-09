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
    if (JSON.stringify(Object.keys(allPostsData)) !== JSON.stringify(Object.keys(response))) {
      dispatch(getPosts(response))
      // dispatch(PostMiddleWare())
    }
    const user = localStorageServices.getValue()
    if (!user) {
      router.push("/login")
    }
  }, [response])

  
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <div>
        <h2 className={utilStyles.headingLg}>User Names</h2>
          <button onClick={() => {
            localStorageServices.removeItem()
            router.push("/login")
        }}>Log out</button>

        </div>
        <button onClick={()=>router.push("/posts/add")}>Add</button>
        <ul className={utilStyles.list}>
          {allPostsData?.map((item) => (
            <li className={utilStyles.listItem} key={item.id}>
              <Link href={`/posts/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
 }

export default RouteAuthGuard(Home)
