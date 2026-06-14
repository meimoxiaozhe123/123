import { useState } from 'react'
import Home from './components/Home'
import Museum from './components/Museum'
import Postcard from './components/Postcard'
import PublicWall from './components/PublicWall'
import QuestionCard from './components/QuestionCard'
import { anonymousNames, questions } from './data/questions'
import styles from './App.module.css'

const STORAGE_KEYS = {
  museum: 'emotion-alchemy-museum',
  publicWall: 'emotion-alchemy-public-wall',
}

function parseStoredItems(key) {
  const raw = localStorage.getItem(key)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function formatTimestamp(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}.${month}.${day} ${hours}:${minutes}`
}

function pickWarmMessage(question, tag) {
  const pool = question.warmMessages[tag] || question.warmMessages.custom
  return pool[Math.floor(Math.random() * pool.length)]
}

function pickAnonymousName() {
  return anonymousNames[Math.floor(Math.random() * anonymousNames.length)]
}

function buildPostcard(question, answer, tag) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    timestamp: formatTimestamp(),
    question: question.text,
    answer,
    warmMessage: pickWarmMessage(question, tag),
    anonymousName: pickAnonymousName(),
  }
}

function copyText(content) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(content)
  }

  const textarea = document.createElement('textarea')
  textarea.value = content
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  return Promise.resolve()
}

function toCardText(card) {
  return `${card.timestamp}\n${card.question}\n${card.answer}\n${card.warmMessage}`
}

function App() {
  const [page, setPage] = useState('home')
  const [museumCards, setMuseumCards] = useState(() => parseStoredItems(STORAGE_KEYS.museum))
  const [publicCards, setPublicCards] = useState(() => parseStoredItems(STORAGE_KEYS.publicWall))
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentPostcard, setCurrentPostcard] = useState(null)
  const [selectedMuseumCard, setSelectedMuseumCard] = useState(null)
  const [notice, setNotice] = useState('')

  const saveMuseum = (card) => {
    const next = [card, ...museumCards]
    setMuseumCards(next)
    localStorage.setItem(STORAGE_KEYS.museum, JSON.stringify(next))
    setNotice('已收藏到你的情绪博物馆。')
  }

  const savePublicWall = (card) => {
    const next = [card, ...publicCards]
    setPublicCards(next)
    localStorage.setItem(STORAGE_KEYS.publicWall, JSON.stringify(next))
    setNotice('已匿名投放到公共情绪墙。')
  }

  const startCapture = () => {
    setNotice('')
    const nextQuestion = questions[Math.floor(Math.random() * questions.length)]
    setCurrentQuestion(nextQuestion)
    setPage('question')
  }

  const makePostcard = ({ answer, tag }) => {
    if (!currentQuestion) {
      return
    }

    const postcard = buildPostcard(currentQuestion, answer, tag)
    setCurrentPostcard(postcard)
    setNotice('')
    setPage('postcard')
  }

  const copyPostcard = async () => {
    if (!currentPostcard) {
      return
    }

    try {
      await copyText(toCardText(currentPostcard))
      setNotice('明信片文字已复制到剪贴板。')
    } catch {
      setNotice('复制失败，请稍后重试。')
    }
  }

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <button type="button" onClick={() => setPage('home')}>
          首页
        </button>
        <button type="button" onClick={() => setPage('museum')}>
          情绪博物馆
        </button>
        <button type="button" onClick={() => setPage('wall')}>
          公共情绪墙
        </button>
      </header>

      {page === 'home' && (
        <Home onStart={startCapture} onMuseum={() => setPage('museum')} onPublicWall={() => setPage('wall')} />
      )}

      {page === 'question' && currentQuestion && (
        <QuestionCard question={currentQuestion} onBack={() => setPage('home')} onSubmit={makePostcard} />
      )}

      {page === 'postcard' && currentPostcard && (
        <Postcard
          postcard={currentPostcard}
          showActions
          notice={notice}
          onCollect={() => saveMuseum(currentPostcard)}
          onSharePublic={() => savePublicWall(currentPostcard)}
          onCopy={copyPostcard}
          onRestart={startCapture}
        />
      )}

      {page === 'museum' && (
        <Museum
          postcards={museumCards}
          onBack={() => setPage('home')}
          onSelect={(card) => setSelectedMuseumCard(card)}
        />
      )}

      {page === 'wall' && <PublicWall postcards={publicCards} onBack={() => setPage('home')} />}

      {selectedMuseumCard && (
        <div className={styles.modal} role="presentation" onClick={() => setSelectedMuseumCard(null)}>
          <div role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <Postcard postcard={selectedMuseumCard} />
            <button type="button" className={styles.close} onClick={() => setSelectedMuseumCard(null)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
