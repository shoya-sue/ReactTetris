import dynamic from 'next/dynamic'

const Tetris = dynamic(() => import('@/components/Tetris'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Tetris />
      </div>
    </main>
  )
} 