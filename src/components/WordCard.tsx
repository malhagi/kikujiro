import { useState, useRef, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Word } from '../App'

interface WordCardProps {
  word: Word
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onPlayAudio: () => void
}

const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onSwipeLeft, 
  onSwipeRight, 
  onPlayAudio 
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 음성 합성 설정
  const speak = (text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      // 이전 음성 중지
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      
      setIsPlaying(true)
      
      utterance.onend = () => {
        setIsPlaying(false)
      }
      
      utterance.onerror = () => {
        setIsPlaying(false)
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handlePlayAudio = () => {
    if (isFlipped) {
      // 뒤집힌 상태: 뜻과 예문 읽기
      const text = word.example 
        ? `${word.meaning}. 예문: ${word.example}`
        : word.meaning
      speak(text, 'ko-KR')
    } else {
      // 앞면 상태: 단어 읽기
      speak(word.word, 'en-US')
    }
    onPlayAudio()
  }

  // 스와이프 제스처 설정
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isFlipped) onSwipeLeft()
    },
    onSwipedRight: () => {
      if (!isFlipped) onSwipeRight()
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    delta: 50, // 최소 스와이프 거리
    swipeDuration: 500, // 스와이프 시간 제한
  })

  // 컴포넌트 언마운트 시 음성 중지
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div 
      {...swipeHandlers}
      ref={cardRef}
      className="perspective-1000 w-full max-w-lg select-none"
    >
      <div 
        className={`relative w-full h-64 md:h-80 cursor-pointer transform-style-preserve-3d transition-transform duration-600 ease-in-out rounded-3xl shadow-xl ${
          isFlipped ? 'rotate-y-180' : ''
        } hover:-translate-y-1 hover:shadow-2xl active:scale-95 touch-manipulation`}
        onClick={handleClick}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl flex items-center justify-center p-8 md:p-10 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="text-center w-full relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-shadow-lg">
              {word.word}
            </h2>
            
            {/* 음성 재생 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePlayAudio()
              }}
              className={`absolute top-2 right-2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              title="음성 재생"
            >
              {isPlaying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-sm opacity-80 font-medium">
              탭하여 뜻 보기 • 좌우 스와이프로 이동
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl flex items-center justify-center p-8 md:p-10 bg-gradient-to-br from-secondary-500 to-secondary-700 text-white rotate-y-180">
          <div className="text-center w-full relative">
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
            
            {/* 음성 재생 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePlayAudio()
              }}
              className={`absolute top-2 right-2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              title="음성 재생"
            >
              {isPlaying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-sm opacity-80 font-medium">
              탭하여 단어 보기
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordCard 