import styles from './Company.module.css'
import Loading from "../layout/Loading"

function Contact(){
    return (
        <div className={styles.projectCard}>
            <h1>Contato</h1>
            <p>Em construção...</p>
            <div className={styles.loader}>
                <Loading />
            </div>
        </div>
    )
}

export default Contact