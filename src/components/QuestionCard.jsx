import { useMemo, useState } from 'react'
import styles from './QuestionCard.module.css'

function QuestionCard({ question, onBack, onSubmit }) {
  const [selected, setSelected] = useState('')
  const [customValue, setCustomValue] = useState('')

  const finalAnswer = useMemo(() => {
    if (customValue.trim()) {
      return { answer: customValue.trim(), tag: 'custom' }
    }

    const option = question.options.find((item) => item.tag === selected)
    if (!option) {
      return null
    }

    return { answer: option.label, tag: option.tag }
  }, [customValue, question.options, selected])

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.timer}>30 秒内，给这份情绪一个形状</p>
        <h2>{question.text}</h2>

        <ul className={styles.options}>
          {question.options.map((option) => (
            <li key={option.tag}>
              <label>
                <input
                  type="radio"
                  name="emotion-option"
                  checked={selected === option.tag}
                  onChange={() => {
                    setSelected(option.tag)
                    setCustomValue('')
                  }}
                />
                <span>{option.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <label className={styles.customInput}>
          <span>或者我想自己描述：</span>
          <input
            type="text"
            value={customValue}
            maxLength={40}
            placeholder="例如：被揉皱的天气预报"
            onChange={(event) => {
              setSelected('')
              setCustomValue(event.target.value)
            }}
          />
        </label>

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={onBack}>
            返回
          </button>
          <button
            type="button"
            className={styles.primary}
            disabled={!finalAnswer}
            onClick={() => onSubmit(finalAnswer)}
          >
            炼成明信片
          </button>
        </div>
      </div>
    </section>
  )
}

export default QuestionCard
