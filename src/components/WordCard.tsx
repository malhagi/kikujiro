import React, { useState } from 'react'
import { Word } from '../App'

interface WordCardProps {
  word: Word
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="perspective-1000 w-full max-w-lg">
      <div 
        className={`relative w-full h-64 md:h-80 cursor-pointer transform-style-preserve-3d transition-transform duration-600 ease-in-out rounded-3xl shadow-xl ${
          isFlipped ? 'rotate-y-180' : ''
        } hover:-translate-y-1 hover:shadow-2xl active:scale-95`}
        onClick={handleClick}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl flex items-center justify-center p-8 md:p-10 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="text-center w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-shadow-lg">
              {word.word}
            </h2>
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-sm opacity-80 font-medium">
              클릭하여 뜻 보기
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl flex items-center justify-center p-8 md:p-10 bg-gradient-to-br from-secondary-500 to-secondary-700 text-white rotate-y-180">
          <div className="text-center w-full">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 text-shadow-lg">
              {word.meaning}
            </h3>
            {word.example && (
              <div className="mt-5 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-sm font-semibold mb-2 opacity-90">예문:</p>
                <p className="text-sm md:text-base leading-relaxed italic">
                  "{word.example}"
                </p>
              </div>
            )}
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-sm opacity-80 font-medium">
              클릭하여 단어 보기
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordCard 