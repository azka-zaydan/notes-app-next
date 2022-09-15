import React from 'react'

const CreateNote = () => {
    return (

        <div className='hidden relative m-auto z-10 w-max h-auto lg:flex transition-all'>
            <div className='dark:bg-slate-500 p-4 rounded-lg flex flex-col space-y-4'>
                <button className='dark:bg-slate-800 rounded-lg p-2 dark:text-white dark:hover:bg-slate-300 dark:hover:text-black'>
                    Create Note
                </button>
                <button className='dark:bg-slate-800 rounded-lg p-2 dark:text-white dark:hover:bg-slate-300 dark:hover:text-black'>
                    Delete Note
                </button>
            </div>
        </div>
    )
}

export default CreateNote