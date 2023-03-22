import Head from 'next/head'
export default function Home() {
  return (
    <div className="flex justify-center p-6 md:p-10 lg:p-16 text-center border">
      <div className='flex flex-col space-x-6'>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <p className="text-xl">
      Ask AI anything and AI'll answer it for you!
    </p>
    </div>
    </div>
  )
}