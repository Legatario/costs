import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

function Loading(){
    return(
        <div className={styles.loadingContainer}>
            <img src={loading} alt='Loading' className={styles.loader}/>
        </div>
    )
}

export default Loading