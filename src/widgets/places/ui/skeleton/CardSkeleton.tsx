import cls from './CardSkeleton.module.css'
export const CardSkeleton = () => {
	return (
		<div className={cls.skeletonContainer}>
			<div className={cls.placesSkeletonWrapper}>

				{Array.from(Array(5), (_, i) => i + 1).map((n) => (
					<div key={n} className={cls.placeSkeleton}>
						<div className={cls.placeImgSkeleton}></div>

						<div className={cls.placeInfoSkeleton}>
							<div className={cls.placeTitleSkeleton}></div>

							<div className={cls.placeLikesSkeleton}></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
