import styles from './CardSkeleton.module.css'
export const CardSkeleton = () => {
	return (
		<div className={styles.skeletonContainer}>
			<div className={styles.placesSkeletonWrapper}>

				{[1,2,3,4,5].map((n) => (
					<div key={n} className={styles.placeSkeleton}>
						<div className={styles.placeImgSkeleton}></div>

						<div className={styles.placeInfoSkeleton}>
							<div className={styles.placeTitleSkeleton}></div>

							<div className={styles.placeLikesSkeleton}></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
