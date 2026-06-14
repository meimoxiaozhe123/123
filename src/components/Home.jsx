import styles from './Home.module.css'

function Home({ onStart, onMuseum, onPublicWall }) {
  return (
    <section className={styles.home}>
      <p className={styles.tagline}>把每一次懊恼，炼成一张有温度的明信片</p>
      <h1 className={styles.title}>情绪炼金术</h1>
      <button type="button" className={styles.primaryButton} onClick={onStart}>
        我现在很烦 / 懊恼
      </button>
      <div className={styles.links}>
        <button type="button" onClick={onMuseum}>
          去我的情绪博物馆
        </button>
        <button type="button" onClick={onPublicWall}>
          看公共情绪墙
        </button>
      </div>
    </section>
  )
}

export default Home
