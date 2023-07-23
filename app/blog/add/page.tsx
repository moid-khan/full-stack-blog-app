"use client"

import { IBlog } from '@/app/page'
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const postBlog = async ({ title, description }: Omit<IBlog, 'id' | 'date'>) => {
    const res = await fetch("http://localhost:3000/api/blog", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        // @ts-ignore
        "Content-Type": "application/json"
    })

    return res.json()
}

const AddBlog = () => {
    const titleValue = useRef<HTMLInputElement | null>(null)
    const descriptionValue = useRef<HTMLTextAreaElement | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(titleValue.current?.value)
        console.log(descriptionValue.current?.value)

        if (!titleValue.current?.value || !descriptionValue.current?.value) return false

        toast.loading("Posting blog 🚀", { id: '1' })
        await postBlog({ title: titleValue.current?.value, description: descriptionValue.current?.value })
        toast.success("Blog posted successfully 🚀", { id: '1' })
    }

    return (
        <>
            <Toaster />
            <div className='w-full m-auto flex my-4'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <p className='text-2xl text-slate-200 font-bold p-3'>Add A Wonderful Blog 🚀</p>
                    <form onSubmit={handleSubmit}>
                        <input ref={titleValue} type="text" placeholder='Enter title' className='rounded-md px-4 py-2 my-2 w-full' />
                        <textarea ref={descriptionValue} placeholder='Enter description' className='rounded-md px-4 py-2 my-2 w-full'></textarea>
                        <button className='font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100'>Submit </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddBlog