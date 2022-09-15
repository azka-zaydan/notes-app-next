import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Header from '../../../../components/Header'
import Layout from '../../../../components/Layout'
import { useCurrentUser } from '../../../../context/CurrentUserContext'
import { fetcher } from '../../../../utils/fetcherAPI'
const Note = () => {
    const router = useRouter()
    const note = router.query.note
    const user = router.query.user
    const { userName, token, setUserToken } = useCurrentUser()
    // console.log(note);`
    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if (localToken) {
            setUserToken((localToken))
        }
    }, [])
    const { data, error } = useSWR(`/api/specificNote?token=${token}&?title=${note}`.replace('"', '').replace('"', '').replace("'", '').replace("'", ''), fetcher)
    return (
        <>
            <Header title={`${user}-${note}`} />
            <Layout>
                <div className='flex flex-col dark:bg-slate-500 p-4 items-center justify-center rounded-lg drop-shadow-2xl shadow-2xl text-center'>
                    Note
                    <p >
                        {data ? data.map((v: any) => (<p key={v.title}>{v.title}</p>)) : ''}
                        {data}

                    </p>
                </div>
            </Layout>
        </>
    )
}

export default Note