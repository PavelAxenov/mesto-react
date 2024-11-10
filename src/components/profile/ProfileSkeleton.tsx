import styles from './ProfileSkeleton.module.css'
const ProfileSkeleton = () => {
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

export default ProfileSkeleton;