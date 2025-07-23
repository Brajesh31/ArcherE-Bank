'use client';
import Login from './components/loginform'
import styles from './page.module.css'
function account(){
    return(
        <main className={styles.main}>
            <section className={styles.form}>
                <Login/>
            </section>
            <div className={styles.banar}>
            </div>
        </main>
    )
}

export default account