import { ClassNames } from "@emotion/react";
import styles from "./cardProposta.modules.css"

function CardProposta(){
    return(
        <div className={styles.caixa}>
            <img></img>
            <div>
                <h1>casa de shows</h1>
                <h2>noite do jaz</h2>
                <h2>sao paulo</h2>
            </div>
            <div>
                <h1>Horario</h1>
                <h1>10</h1>
            </div>
        </div>
    )
}
export default CardProposta;