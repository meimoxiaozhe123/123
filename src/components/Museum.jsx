import styles from './Museum.module.css'

function Museum({ postcards, onBack, onSelect }) {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h2>我的情绪博物馆</h2>
        <p>你已经收藏了 {postcards.length} 张明信片，经历了 {postcards.length} 次风暴</p>
      </div>

      {postcards.length === 0 ? (
        <p className={styles.empty}>你的博物馆还很安静，先去炼一张明信片吧。</p>
      ) : (
        <div className={styles.grid}>
          {postcards.map((card) => (
            <button type="button" key={card.id} className={styles.card} onClick={() => onSelect(card)}>
              <span>{card.timestamp}</span>
              <strong>{card.answer}</strong>
              <em>{card.warmMessage}</em>
            </button>
          ))}
        </div>
      )}

      <button type="button" className={styles.back} onClick={onBack}>
        返回首页
      </button>
    </section>
  )
}

export default Museum
