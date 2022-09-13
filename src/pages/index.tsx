import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useCurrentUser } from "../context/CurrentUserContext";

const Home: NextPage = () => {
  const { userName, setUserNameLocal } = useCurrentUser()

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    if (username !== null || username) {
      setUserNameLocal((username).replace('"', '').replace('"', ''))
    }
  })

  return (
    <>
      <Header title={'Home'} />
      <Layout>

        <div className='flex flex-col w-auto h-min dark:bg-slate-500 p-4 rounded-lg text-center transition-all shadow-2xl drop-shadow-2xl'>
          {userName === '' || userName === 'null' ? (
            <div className="flex flex-col">
              <Link href={'/login'}>
                <button className="dark:hover:text-white transition-all">Please Log in</button>
              </Link>

            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2">
              <p>Hello</p>
              <p>{userName.replace('"', '').replace('"', '')}</p>
              <Link href={`/users/${userName}`}>
                <button className="dark:bg-slate-800 dark:text-white dark:hover:border dark:hover:border-white rounded-lg w-max p-2">My Notes</button>
              </Link>
            </div>
          )}
        </div>
      </Layout>

    </>
  );
};

export default Home;

