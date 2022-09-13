import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className='flex flex-col h-screen dark:bg-gray-800 bg-slate-300 items-center justify-center'>
            {children}
        </div>
    )
}

export default Layout