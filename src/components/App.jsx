import styles from './App.module.css';

export const App = () => (
  <>
    <h1 className={styles.title}>Hello, React</h1>
  </>
);

//! Або можна зробити ось так без import styles

// export const App = () => (
//   <>
//     <h1 className="text-yellow-300 font-extrabold font-sans text-6xl">Hello, React</h1>
//   </>
// );

//! Моя вам порада - оскільки ми використовуємо Tailwind,
//! ми повністю позбавляємося CSS файлів, тому краще писати інлайн стилі,
//! оскільки Tailwind сам все зробить за нас, а також неперевершено оптимізує
//! CSS файли, тому бийте компоненти на маленькі під-компоненти
//! щоб воно виглядало чисто, і постарайтеся повністю позбавитися від CSS файлів.
