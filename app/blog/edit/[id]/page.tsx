"use client"

import { IBlog } from '@/app/page'
import { useRouter } from 'next/navigation'
import React, { useRef, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const getBlogById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`)
    const data = await res.json()
    return data.post
}

const updateBlog = async ({ id, title, description }: Omit<IBlog, 'date'>) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        // @ts-ignore
        "Content-Type": "application/json"
    })

    return res.json()
}

const deleteBlog = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "DELETE",
        // @ts-ignore
        "Content-Type": "application/json"
    })

    return res.json()
}

const EditBlog = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    const titleValue = useRef<HTMLInputElement | null>(null)
    const descriptionValue = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        toast.loading('Loading blog...', { id: '1' })
        getBlogById(params.id).then((data) => {
            if (titleValue.current && descriptionValue.current) {
                titleValue.current.value = data.title
                descriptionValue.current.value = data.description
                toast.success('Blog loaded successfully', { id: '1' })
            }
        }).catch(error => {
            console.error(error)
            toast.error('Error fetching blog', { id: '1' })
        })
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(titleValue.current?.value)
        console.log(descriptionValue.current?.value)

        if (!titleValue.current?.value || !descriptionValue.current?.value) return false

        toast.loading("Updating blog 🚀", { id: '1' })
        await updateBlog({ id: params.id, title: titleValue.current?.value, description: descriptionValue.current?.value })
        router.replace('/')
        toast.success("Blog updated successfully 🚀", { id: '1' })
    }

    const handleDelete = async () => {
        toast.loading("Deleting blog 🚀", { id: '1' })
        await deleteBlog(params.id)
        toast.success("Blog deleted successfully 🚀", { id: '1' })
        router.replace('/')
    }

    return (
        <>
            <Toaster />
            <div className='w-full m-auto flex my-4'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <p className='text-2xl text-slate-200 font-bold p-3'>Edit A Wonderful Blog 🚀</p>
                    <form onSubmit={handleSubmit}>
                        <input ref={titleValue} type="text" placeholder='Enter title' className='rounded-md px-4 py-2 my-2 w-full' />
                        <textarea ref={descriptionValue} placeholder='Enter description' className='rounded-md px-4 py-2 my-2 w-full'></textarea>
                        <div className='flex justify-center'>
                            <button className='font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100'>Update</button>
                        </div>
                    </form>
                    <button className='font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-300 my-4' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default EditBlog