import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Header from '../../../../components/Header'
import Layout from '../../../../components/Layout'
import { useCurrentUser } from '../../../../context/CurrentUserContext'
import { fetcher } from '../../../../utils/fetcherAPI'
import { Note } from '../../../../utils/interfaces'
import { stringSplitter } from '../../../../utils/splitting'

const Note = () => {
    const router = useRouter()
    const title = router.query.note
    const user = router.query.user
    const { token, setUserToken } = useCurrentUser()
    // console.log(note);`
    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if (localToken) {
            setUserToken((localToken))
        }
    }, [])
    const { data } = useSWR<Note[]>(`/api/specificNote?token=${token}&?title=${title}`.replaceAll('"', ''), fetcher)
    console.log(data?.map(v => console.log(v.description, v.description.length)))
    return (
        <>
            <Header title={`${user}-${title}`} />
            <Layout>
                <div className='flex flex-col mx-8 w-auto dark:bg-slate-500 p-4 items-center justify-center rounded-lg drop-shadow-2xl shadow-2xl text-center space-y-2'>
                    <p className='font-bold text-2xl dark:text-white'>{title}</p>
                    {data ? data.filter(v => v.title.trim() === title).map(v => (
                        <div key={v.title} className='dark:bg-slate-800 dark:text-white md:w-auto h-min p-4 rounded-lg mx-auto overflow-auto'>
                            <p className=''>{v.description.length > 30 ? (
                                <>
                                    <p>{stringSplitter(v.description).firstHalf}</p>
                                    <p>{stringSplitter(v.description).secondHalf}</p>
                                </>
                            ) : v.description}</p>
                        </div>
                    )) : <p>Loading...</p>}
                    <button onClick={() => router.back()} className='py-2 dark:bg-slate-800 rounded-lg dark:text-white w-auto px-4 dark:hover:bg-slate-300 dark:hover:text-black transition-all'>Go Back</button>
                </div>
            </Layout>
        </>
    )
}

export default Note