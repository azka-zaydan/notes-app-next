import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Layout from '../../../components/Layout'
import { fetcher } from '../../../utils/fetcherAPI'
import { useCurrentUser } from '../../../context/CurrentUserContext'
import Link from 'next/link'
import Header from '../../../components/Header'
import CreateNote from '../../../components/CreateNote'


const User = () => {
    const router = useRouter()
    const { token, setUserToken, logOut } = useCurrentUser()

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if (localToken) {
            setUserToken((localToken))
        }
    }, [])
    const { user } = router.query
    const { data, error } = useSWR(`/api/notes?token=${token}`.replace('"', '').replace('"', ''), fetcher)



    return (
        <>
            <Header title={`${user}`} />

            <Layout>
                <div className='relative container z-50 w-max h-max p-4 rounded-lg flex flex-col dark:bg-slate-500 items-center justify-center text-center space-y-2 transition-all shadow-2xl drop-shadow-2xl'>
                    <div className={token ? 'flex space-x-2 flex-col' : 'hidden'}>
                        {token === '' ? null :
                            <>
                                <p>
                                    Current User:
                                </p>
                                <p>
                                    {user}
                                </p>
                            </>
                        }
                    </div>
                    <div className={`${error ? 'hidden' : ''} container items-center flex space-x-4 relative text-center dark:bg-slate-800 dark:text-white p-2 rounded-lg transition-all`}>
                        <div className='flex flex-col space-y-2 cursor-pointer container h-[25rem] overflow-auto py-1 hover:rounded-lg px-2 hover:border hover:border-black dark:hover:border dark:hover:border-white dark:hover:rounded-lg dark:hover:border-solid transition-all'>
                            {data ? data.length > 0 ? (data.map((v: any) => (
                                <div key={v.title} className='flex w-auto flex-col justify-center items-center px-2 dark:hover:border dark:hover:border-white dark:hover:rounded-lg transition-all'>
                                    <p className='text-2xl'>{v.title}</p>

                                    {
                                        v.role === 'user' ? '' :
                                            <p>owner: {v.owner}</p>
                                    }
                                </div>
                            ))) : 'No Notes' : 'Loading...'}
                        </div>

                    </div>
                    {error ? (
                        <Link href={'/login'}>
                            <button className='dark:hover:text-white pb-2'>Please Log-in</button>
                        </Link>
                    ) : ''}
                    {token === '' ? '' : (
                        <div className='flex space-x-2'>
                            <button onClick={() => logOut()} >
                                <div className='py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all'>
                                    Log Out
                                </div>
                            </button>
                            <Link href={'/'}>
                                <button>
                                    <div className='py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all'>
                                        Home
                                    </div>
                                </button>
                            </Link>
                            <button>
                                <div className='py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all'>
                                    Create Note
                                </div>
                            </button>
                        </div>
                    )
                    }
                </div>


            </Layout >
        </>
    )
}

export default User