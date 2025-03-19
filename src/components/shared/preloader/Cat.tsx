import React from 'react';
import styles from './Cat.module.scss';

const Cat: React.FC = () => {
  return (
    <div className={styles.cat}>
      <div className={`${styles.ear} ${styles.earLeft}`}></div>
      <div className={`${styles.ear} ${styles.earRight}`}></div>
      <div className={styles.face}>
        <div className={`${styles.eye} ${styles.eyeLeft}`}>
          <div className={styles.pupil}></div>
        </div>
        <div className={`${styles.eye} ${styles.eyeRight}`}>
          <div className={styles.pupil}></div>
        </div>
        <div className={styles.muzzle}></div>
      </div>
    </div>
  );
};

export default Cat;
