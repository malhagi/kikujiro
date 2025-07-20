import { useState } from 'react'
import WordCard from './components/WordCard'
import WordList from './components/WordList'

export interface Word {
  id: number
  word: string
  meaning: string
  example?: string
}

const defaultWords: Word[] = [
  { id: 1, word: 'Serendipity', meaning: '우연한 발견', example: 'Finding this cafe was pure serendipity.' },
  { id: 2, word: 'Ephemeral', meaning: '일시적인, 덧없는', example: 'The beauty of cherry blossoms is ephemeral.' },
  { id: 3, word: 'Ubiquitous', meaning: '어디에나 있는, 보편적인', example: 'Smartphones have become ubiquitous.' },
  { id: 4, word: 'Eloquent', meaning: '웅변적인, 설득력 있는', example: 'She gave an eloquent speech.' },
  { id: 5, word: 'Resilient', meaning: '탄력 있는, 회복력 있는', example: 'Children are remarkably resilient.' },
  { id: 6, word: 'Perseverance', meaning: '인내, 끈기', example: 'Success comes through perseverance.' },
  { id: 7, word: 'Authentic', meaning: '진정한, 진짜의', example: 'This is an authentic Italian restaurant.' },
  { id: 8, word: 'Innovative', meaning: '혁신적인', example: 'The company is known for innovative products.' },
]

function App() {
  const [words, setWords] = useState<Word[]>(defaultWords)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showList, setShowList] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length)
  }

  const handleSwipeLeft = () => {
    handleNext()
  }

  const handleSwipeRight = () => {
    handlePrev()
  }

  const handlePlayAudio = () => {
    // 추가적인 오디오 재생 로직이 필요하면 여기에 추가
    console.log('Audio played')
  }

  const addWord = (newWord: Omit<Word, 'id'>) => {
    const word: Word = {
      ...newWord,
      id: Math.max(...words.map(w => w.id), 0) + 1
    }
    setWords([...words, word])
  }

  const deleteWord = (id: number) => {
    setWords(words.filter(word => word.id !== id))
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(Math.max(0, words.length - 2))
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] max-w-4xl mx-auto">
      <header className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-8 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">📚 단어 암기 연습</h1>
        <button 
          className="absolute top-5 right-5 bg-white/20 border-2 border-white/30 text-white px-5 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 active:scale-95"
          onClick={() => setShowList(!showList)}
        >
          {showList ? '카드 보기' : '단어 목록'}
        </button>
      </header>

      {showList ? (
        <WordList 
          words={words} 
          onAddWord={addWord}
          onDeleteWord={deleteWord}
        />
      ) : (
        <div className="p-8 md:p-10 flex flex-col items-center gap-8">
          {words.length > 0 ? (
            <>
              <WordCard 
                word={words[currentIndex]} 
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onPlayAudio={handlePlayAudio}
              />
              <div className="flex items-center gap-5 mt-5">
                <button 
                  onClick={handlePrev} 
                  disabled={words.length <= 1}
                  className="bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none px-6 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-95"
                >
                  ← 이전
                </button>
                <span className="text-xl font-semibold text-primary-600 min-w-[80px] text-center">
                  {currentIndex + 1} / {words.length}
                </span>
                <button 
                  onClick={handleNext} 
                  disabled={words.length <= 1}
                  className="bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none px-6 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-95"
                >
                  다음 →
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 px-5 text-gray-600">
              <p className="text-xl mb-5">단어가 없습니다. 단어를 추가해보세요!</p>
              <button 
                onClick={() => setShowList(true)}
                className="bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none px-6 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                단어 목록으로 이동
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App 