import styles from './ProfileSkeleton.module.css'

export const ProfileSkeleton = () => {
	return (
		<div className={styles.skeletonContainer}>
			<div className={styles.profileSkeletonContainer}>
				<div className={styles.avatarSkeleton}></div>

				<div className={styles.infoSkeletonContainer}>
					<div className={styles.titleSkeleton}></div>
					<div className={styles.textSkeleton}></div>
				</div>
			</div>

			<div className={styles.addCardSkeleton}></div>
		</div>
	);
};
