import styles from "./HeroArtifact.module.css";

export default function HeroArtifact() {
  return (
    <aside className={styles.artifact} aria-label="Animated Paul Murphy monogram artwork">
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.index} aria-hidden="true">
        <span>PM</span>
        <span>001</span>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={`${styles.orbit} ${styles.outerOrbit}`}>
          <span className={`${styles.node} ${styles.nodeOne}`} />
          <span className={`${styles.node} ${styles.nodeTwo}`} />
        </div>
        <div className={`${styles.orbit} ${styles.innerOrbit}`}>
          <span className={`${styles.node} ${styles.nodeThree}`} />
        </div>

        <div className={styles.monogram}>
          <span>P</span>
          <span>M</span>
        </div>

        <svg className={styles.trace} viewBox="0 0 400 520" fill="none">
          <path d="M-20 88C87 88 67 202 170 202C262 202 241 121 420 121" />
          <path d="M-20 367C89 367 104 288 190 288C296 288 282 431 420 431" />
          <path d="M44 -20V102C44 158 86 165 86 224V540" />
          <path d="M340 -20V144C340 199 306 208 306 263V540" />
        </svg>

        <div className={styles.scan} />
        <div className={styles.block} />
      </div>

      <div className={styles.footer} aria-hidden="true">
        <span>Paul Murphy</span>
        <span>Data &amp; AI Systems</span>
      </div>
    </aside>
  );
}
