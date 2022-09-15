import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useCurrentUser } from "../context/CurrentUserContext";

const Home: NextPage = () => {
  const { userName, setUserNameLocal, token, logOut, setUserToken } = useCurrentUser()

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    const localToken = window.localStorage.getItem('token')
    if (username !== null || username) {
      setUserNameLocal((username).replace('"', '').replace('"', ''))
    }
    if (localToken) {
      setUserToken(localToken)
    }
    // setUserToken(String(window.localStorage.getItem('token')))
  }, [])

  return (
    <>
      <Header title={'Home'} />
      <Layout>

        <div className='flex flex-col w-auto h-min dark:bg-slate-500 p-4 rounded-lg text-center transition-all shadow-2xl drop-shadow-2xl'>
          {userName === '' || userName === 'null' ? (
            <div className="flex flex-col">
              <Link href={'/login'}>
                <button className="py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all">Log in</button>
              </Link>

            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2">
              <p>Hello</p>
              <p>{userName.replace('"', '').replace('"', '')}</p>
              <Link href={`/users/${userName}`}>
                <button className="py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all">My Notes</button>
              </Link>
              <button onClick={() => logOut()} >
                <div className='py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all'>
                  Log Out
                </div>
              </button>
            </div>
          )}
        </div>
      </Layout>

    </>
  );
};

export default Home;

