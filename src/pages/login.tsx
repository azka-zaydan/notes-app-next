/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useRef } from 'react'
import useSWR from 'swr'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { useCurrentUser } from '../context/CurrentUserContext'

const Login: NextPage = () => {
    const { userName, setUserNameLocal, logIn } = useCurrentUser()
    const name = useRef<HTMLInputElement>(null)
    const pass = useRef<HTMLInputElement>(null)

    const handleClick = async () => {
        if (null !== name.current && null !== pass.current) {
            await logIn(name.current?.value, pass.current?.value)
        }
    }
    useEffect(() => {
        if (name.current?.value !== '') {
            setUserNameLocal(userName)
            localStorage.setItem('username', JSON.stringify(userName))
        }
    }, [])

    // console.log(name.current?.value === '')

    return (
        <>
            <Header title={'Login'} />

            <Layout>
                <div className='h-min w-auto dark:bg-slate-500 flex flex-col text-center justify-center rounded-lg drop-shadow-2xl shadow-2xl'>
                    {userName === '' ?
                        <form action="" className='flex flex-col px-2 space-y-3 py-2 justify-center items-center'>
                            <label htmlFor="username">Username</label>
                            <input type="text" ref={name} name='username' className='px-2 rounded-md' />
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className='px-2 rounded-md' id="" ref={pass} />
                            <p className='relative top-2'>
                                Please Enter Your Credentials
                            </p>
                            <Link href={`/logged-in`}>
                                <button onClick={handleClick} className='transition-all dark:hover:bg-slate-300 w-auto flex p-2 rounded-lg'>Submit</button>
                            </Link>
                        </form>
                        :
                        <div className='hidden flex-col text-center p-4 items-center justify-center '>
                            <p>Time To Log In</p>
                            <Link href={`/logged-in`}>
                                <button className='transition-all dark:hover:bg-slate-300 w-auto flex p-2 rounded-lg cursor-pointer mt-2'>Let's Go!</button>
                            </Link>
                        </div>
                    }

                </div>
            </Layout>
        </>
    )
}

export default Login