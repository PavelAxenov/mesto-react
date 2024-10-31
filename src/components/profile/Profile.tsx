import {IUserInfo} from "../../utils/api/types";
import styles from "./Profile.module.css"
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
interface IProps {
	onEditAvatar: () => void,
	onEditProfile: () => void,
	onAddPlace: () => void,
}

export default function Profile(props: IProps) {
	const currentUser: IUserInfo = useContext(CurrentUserContext);

	return (
		<>
			{
				currentUser &&
				<section className={styles.profile}>
					<div className={styles['profile-container']}>
						<div className={styles['avatar-container']}>
							<img
								src={currentUser.avatar}
								alt={currentUser.name}
								className={styles.avatar}
							/>

							<button
								aria-label="Изменить аватар"
								type="button"
								className={styles['avatar-edit-btn']}
								onClick={props.onEditAvatar}>
							</button>
						</div>
						<div className={styles['profile-info']}>
							<h1 className={styles['profile-name']}>{currentUser.name}</h1>

							<button
								aria-label="Изменить"
								type="button"
								className={styles['profile-edit-btn']}
								onClick={props.onEditProfile}>
							</button>

							<p className={styles['profile-description']}>{currentUser.about}</p>
						</div>
					</div>

					<button
						aria-label="Добавить"
						type="button"
						className={styles['profile-add-button']}
						onClick={props.onAddPlace}>
					</button>
				</section>
			}
		</>
	)
}