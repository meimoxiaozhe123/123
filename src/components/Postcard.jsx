import styles from './Postcard.module.css'

function Postcard({ postcard, showActions = false, onCollect, onSharePublic, onCopy, onRestart, notice }) {
  return (
    <section className={styles.section}>
      <article className={styles.postcard}>
        <p className={styles.timestamp}>{postcard.timestamp}</p>
        <p className={styles.question}>{postcard.question}</p>
        <p className={styles.answer}>{postcard.answer}</p>
        <p className={styles.message}>{postcard.warmMessage}</p>
        {postcard.anonymousName && <p className={styles.anonymous}>匿名署名：{postcard.anonymousName}</p>}
      </article>

      {showActions && (
        <>
          <div className={styles.actions}>
            <button type="button" onClick={onCollect}>
              💾 收入我的情绪博物馆
            </button>
            <button type="button" onClick={onSharePublic}>
              🌐 匿名投放到公共情绪墙
            </button>
            <button type="button" onClick={onCopy}>
              📮 发给一个朋友
            </button>
          </div>
          <button type="button" className={styles.restart} onClick={onRestart}>
            再炼一张
          </button>
          {notice && <p className={styles.notice}>{notice}</p>}
        </>
      )}
    </section>
  )
}

export default Postcard
