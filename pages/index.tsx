import Head from 'next/head'
export default function Home() {
  const topic = "Microsoft's earnings report"
  return (
    <div className="flex justify-center p-6 md:p-10 lg:p-16 text-center h-screen w-full">
      <Head>
        <title>Ask AI</title>
      </Head>
      <div className='flex flex-col space-y-6 max-w-2xl'>
    <h1 className="text-3xl font-bold underline">
      Ask AI
    </h1>
    <p className="text-xl text-semibold">
      Ask AI about {topic} and AI&apos;ll answer it for you.
    </p>
    <textarea className='border h-24 text-lg border-black rounded-lg px-3 py-2'placeholder={`Ask AI about ${topic}`}></textarea>
    <div className='flex flex-row justify-evenly text-lg text-semibold'>
    <button className='bg-black text-white rounded-lg px-6 py-2 min-w-[35%]'>Ask Question</button>
    <button className='bg-gray-200 rounded-lg px-6 py-2 min-w-[35%]'>I&apos;m feeling lucky</button>
    </div>
    </div>
    </div>
  )
}