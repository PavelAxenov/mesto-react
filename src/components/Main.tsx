import { ICard } from "../utils/api/types";
import Profile from "./profile/Profile";
import Places from "./places/Places";

interface IProps {
	onEditAvatar: () => void,
	onEditProfile: () => void,
	onAddPlace: () => void,
	onCardClick: (card: ICard) => void,
	onCardLike: (card: ICard) => void,
	onCardDelete: (card: ICard) => void,
}

export default function Main(props: IProps) {

	return (
		<main className="content">
			<Profile
				onEditAvatar={props.onEditAvatar}
				onEditProfile={props.onEditProfile}
				onAddPlace={props.onAddPlace}
			/>

			<Places
				onCardClick={props.onCardClick}
				onCardLike={props.onCardLike}
				onCardDelete={props.onCardDelete}
			/>
		</main>
	);
}
