import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './worldSwitcher.module.scss';

const WordSwitcher = () => {
  const words = ["онлайн-обучения", "новых возможностей"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // смена слова каждые 2 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      <AnimatePresence>
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }} 
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <div className={styles.container}> 
      <p>для</p>
      <div className={styles.container_worlds}>
        <WordSwitcher />
      </div>
    </div>
  );
};

export default App;