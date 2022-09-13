/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useRef } from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'
import { useCurrentUser } from '../context/CurrentUserContext'

const Login: NextPage = () => {
    const { userName, userPassword, logIn } = useCurrentUser()
    const name = useRef<HTMLInputElement>(null)
    const pass = useRef<HTMLInputElement>(null)

    const handleClick = async () => {
        if (null !== name.current && null !== pass.current) {
            await logIn(name.current?.value, pass.current?.value)
        }
    }
    useEffect(() => {
        if (null !== name.current && null !== pass.current) {
            logIn(name.current?.value, pass.current?.value)
        }
    }, [])

    // console.log(name.current?.value === '')

    return (
        <Layout>
            <div className='h-min w-auto bg-slate-500 flex flex-col text-center justify-center rounded-lg drop-shadow-2xl shadow-2xl'>
                <form action="" className='flex flex-col px-2 space-y-3 py-2 justify-center items-center'>
                    <label htmlFor="username">Username</label>
                    <input type="text" ref={name} name='username' className='px-2 rounded-md' />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className='px-2 rounded-md' id="" ref={pass} />
                    {name.current?.value === '' ?
                        <>
                            <p className='relative top-2'>
                                Please Enter Your Credentials
                            </p>
                            <button onClick={handleClick} className='transition-all hover:bg-slate-300 w-auto flex p-2 rounded-lg'>Submit</button>
                        </> :
                        name.current?.value === '' && pass.current?.value === '' ? 'Please Enter Your Credentials' :
                            <Link href={`/logged-in`}>
                                <button className='transition-all hover:bg-slate-300 w-auto flex p-2 rounded-lg'>Let's Go!</button>
                            </Link>
                    }
                </form>

            </div>
        </Layout>
    )
}

export default Login