import style from './LinkBotton.module.css';
import {Link} from 'react-router-dom';

function LinkButton({to, text}){
    return(
        <Link to={to} className={style.btn}>
            {text}
        </Link>
    )
}

export default LinkButton