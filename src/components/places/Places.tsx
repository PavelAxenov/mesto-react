import { ICard } from "../../utils/api/types";
import PlaceCard from "./PlaceCard";
import {useContext} from "react";
import { CardsContext } from "../../contexts/CardsContext";
import styles from "./Places.module.css"

interface IProps {
	onCardLike: (card: ICard) => void,
	onCardDelete: (card: ICard) => void,
}

export default function Places(props: IProps) {
	const cards: ICard[] = useContext(CardsContext);

	return (
		<>
			{cards.length &&
				<section className={styles.places}>
					<ul className={styles.places__cards}>
						{cards.map((card: ICard) => (
							<PlaceCard
								key={card._id}
								card={card}
								onCardLike={props.onCardLike}
								onCardDelete={props.onCardDelete}
							/>)
						)}
					</ul>
				</section>
			}
		</>
	)
}
