import Link from "next/link";

export interface IBlog {
  id: string;
  title: string;
  description: string;
  date: string
}

async function fetchBlogs(): Promise<IBlog[]> {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10
    }
  })
  const data = await res.json()
  return data.posts
}

export default async function Home() {
  const blogs = await fetchBlogs();
  console.log(blogs)
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">My Full Stack Blog App With NextJs</h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link href="/blog/add" className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold hover:bg-slate-400 duration-200">Add New Blog 🚀</Link>
      </div>
      {/* Blogs */}
      <div className="w-full flex flex-col justify-center items-center">
        {blogs?.map(blog => <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
          {/* Title & Action */}
          <div className="flex items-center my-3">
            <div className="mr-auto">
              <h2 className="mr-auto font-semibold text-xl">{blog.title}</h2>
            </div>
            <Link href={`/blog/edit/${blog.id}`} className="px-4 py-1 text-xl bg-slate-900 rounded-md font-semibold text-slate-200 hover:bg-slate-200 hover:text-slate-900 duration-200">Edit</Link>
          </div>
          {/* Date & Description */}
          <div className="mr-auto my-1">
            <blockquote className="font-bold text-slate-700 text-xs">{new Date(blog.date).toDateString()}</blockquote>
          </div>
          <div className="mr-auto my-1">
            <h2>{blog.description}</h2>
          </div>
        </div>)}
      </div>
    </main>
  )
}
