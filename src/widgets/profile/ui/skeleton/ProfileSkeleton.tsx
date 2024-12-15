import cls from './ProfileSkeleton.module.css'

export const ProfileSkeleton = () => {
	return (
		<div className={cls.skeletonContainer}>
			<div className={cls.profileSkeletonContainer}>
				<div className={cls.avatarSkeleton}></div>

				<div className={cls.infoSkeletonContainer}>
					<div className={cls.titleSkeleton}></div>
					<div className={cls.textSkeleton}></div>
				</div>
			</div>

			<div className={cls.addCardSkeleton}></div>
		</div>
	);
};
