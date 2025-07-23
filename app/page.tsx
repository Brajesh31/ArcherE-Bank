import styles from "./page.module.css";
import Header from './components/header';
import Footer from './components/footer';
import About from "./components/about";
import Visa from "./components/visa";

export default function Home() {
  return (
    <div>
      <Header/>

      <main className={styles.main + ' ' + styles.animatedFadeSlideIn}>
        <Visa/>
        
        <About/>
      
      </main>
      <Footer/>
    </div>
  );
}
