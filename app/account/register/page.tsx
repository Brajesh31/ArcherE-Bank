import styles from './page.module.css';
import Form from './components/formregister';

function register() {
    return(
        <main className={styles.main}>
            <Form/>
        </main>
    )
}
export default register;