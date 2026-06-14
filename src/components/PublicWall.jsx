import styles from './PublicWall.module.css'

function PublicWall({ postcards, onBack }) {
  return (
    <section className={styles.page}>
      <h2>公共情绪墙</h2>
      <p className={styles.desc}>这里是匿名投放的情绪碎片，你并不孤单。</p>

      {postcards.length === 0 ? (
        <p className={styles.empty}>公共情绪墙还没有明信片，成为第一个投放的人吧。</p>
      ) : (
        <div className={styles.grid}>
          {postcards.map((card) => (
            <article key={card.id} className={styles.card}>
              <p className={styles.name}>{card.anonymousName}</p>
              <p className={styles.answer}>{card.answer}</p>
              <p className={styles.message}>{card.warmMessage}</p>
              <p className={styles.time}>{card.timestamp}</p>
            </article>
          ))}
        </div>
      )}

      <button type="button" className={styles.back} onClick={onBack}>
        返回首页
      </button>
    </section>
  )
}

export default PublicWall
