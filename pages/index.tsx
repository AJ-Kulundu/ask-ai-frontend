import Head from 'next/head'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function getStaticProps() {
  const API_URL = process.env.API_URL

  return {
    props: {
      API_URL,
    },
  }
}

export default function Home({ API_URL }: { API_URL: string }) {
  const topic = "Microsoft's earnings report"
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<String>('')
  const [loading, setLoading] = useState(false)

  const askQuestion = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setAnswer('')
    const res = await fetch(`${API_URL}/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: { question: question } }),
    })

    if (!res.ok) {
      setLoading(false)
      throw new Error(res.statusText)
    }

    const data = res.body

    if (!data) {
      return
    }

    const decoder = new TextDecoder()
    const reader = data.getReader()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunk = decoder.decode(value)
      setAnswer((prev) => prev + chunk)
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center p-6 md:p-10 lg:p-16 text-center h-screen w-full">
      <Head>
        <title>Ask AI</title>
      </Head>
      <div className="flex flex-col space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold underline">Ask AI</h1>
        <p className="text-xl text-semibold">
          Ask AI about {topic} and AI&apos;ll answer it for you.
        </p>
        <textarea
          className="border h-24 text-lg border-black rounded-lg px-3 py-2"
          placeholder={`Ask AI about ${topic}`}
          cols={30}
          rows={5}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="flex flex-row justify-evenly text-lg text-semibold">
          <button
            className="bg-black text-white rounded-lg px-6 py-2 min-w-[35%]"
            onClick={(e) => askQuestion(e)}
          >
            {loading ? 'Getting Answer' : 'Ask Question'}
          </button>
          <button className="bg-gray-200 rounded-lg px-6 py-2 min-w-[35%]">
            I&apos;m feeling lucky
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div>{answer}</motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
