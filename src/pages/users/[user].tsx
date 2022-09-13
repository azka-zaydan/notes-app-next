import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import axios from 'axios'
import FormData from 'form-data'
import { fetcher } from '../../utils/fetcherAPI'
import { useCurrentUser } from '../../context/CurrentUserContext'
import Link from 'next/link'


const User = () => {
    const router = useRouter()
    const { token, setUserToken, logOut } = useCurrentUser()

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if (localToken) {
            setUserToken((localToken))
        } else {
            window.location.href = '/login'
        }
    }, [])
    const { user } = router.query
    const { data, error } = useSWR(`/api/notes?token=${token}`.replace('"', '').replace('"', ''), fetcher)



    return (
        <Layout>
            <div className='w-auto h-min p-4 rounded-lg flex flex-col bg-slate-500 items-center justify-center text-center space-y-2 transition-all shadow-2xl drop-shadow-2xl'>
                <div>

                    <p>
                        Current User:
                    </p>
                    <p>
                        {user}
                    </p>
                </div>
                <div className={`${error ? 'hidden' : ''} flex flex-col bg-slate-800 text-white p-2 rounded-lg transition-all`}>
                    {data ? data.length > 1 ? data.map((v: any) => (
                        <div key={v.title} className='w-auto h-min py-1 px-2 hover:border hover:border-white hover:rounded-lg hover:border-solid transition-all'>
                            <p>{v.title}</p>
                        </div>
                    )) : 'No Notes' : (<p className={`${error ? 'hidden' : ''}`}>Loading...</p>)}

                </div>
                {error ? (
                    <Link href={'/login'}>
                        <button className='hover:text-white'>Please Log-in</button>
                    </Link>
                ) : ''}
                {token === '' ? '' : (
                    <button onClick={() => logOut()} >
                        <div className='py-2 bg-slate-800 rounded-lg text-white w-auto px-4 hover:border hover:border-white transition-all'>
                            Log Out
                        </div>
                    </button>
                )
                }
            </div>
        </Layout>
    )
}

export default User