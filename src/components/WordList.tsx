import React, { useState } from 'react'
import { Word } from '../App'

interface WordListProps {
  words: Word[]
  onAddWord: (word: Omit<Word, 'id'>) => void
  onDeleteWord: (id: number) => void
}

const WordList: React.FC<WordListProps> = ({ words, onAddWord, onDeleteWord }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [newExample, setNewExample] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWord.trim() && newMeaning.trim()) {
      onAddWord({
        word: newWord.trim(),
        meaning: newMeaning.trim(),
        example: newExample.trim() || undefined
      })
      setNewWord('')
      setNewMeaning('')
      setNewExample('')
      setShowAddForm(false)
    }
  }

  return (
    <div className="p-8 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          단어 목록 ({words.length}개)
        </h2>
        <button 
          className="bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none px-6 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 w-full md:w-auto"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '취소' : '+ 새 단어 추가'}
        </button>
      </div>

      {showAddForm && (
        <form className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-gray-200" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="word" className="block mb-2 font-semibold text-gray-800">
              단어 *
            </label>
            <input
              id="word"
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="영어 단어를 입력하세요"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="meaning" className="block mb-2 font-semibold text-gray-800">
              뜻 *
            </label>
            <input
              id="meaning"
              type="text"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              placeholder="한국어 뜻을 입력하세요"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="example" className="block mb-2 font-semibold text-gray-800">
              예문 (선택사항)
            </label>
            <textarea
              id="example"
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
              placeholder="예문을 입력하세요"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg resize-none"
            />
          </div>
          <div className="text-right">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none px-8 py-3 rounded-full cursor-pointer font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              추가하기
            </button>
          </div>
        </form>
      )}

      <div className="mt-8">
        {words.length === 0 ? (
          <div className="text-center py-16 px-5 text-gray-600 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <p className="text-xl">아직 단어가 없습니다. 첫 번째 단어를 추가해보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {words.map((word) => (
              <div key={word.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary-300 relative group">
                <div className="mr-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {word.word}
                  </h3>
                  <p className="text-lg text-primary-600 font-semibold mb-3">
                    {word.meaning}
                  </p>
                  {word.example && (
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{word.example}"
                    </p>
                  )}
                </div>
                <button
                  className="absolute top-4 right-4 bg-red-500 text-white border-none w-8 h-8 rounded-full cursor-pointer text-lg font-bold flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110 active:scale-95"
                  onClick={() => onDeleteWord(word.id)}
                  title="단어 삭제"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WordList 