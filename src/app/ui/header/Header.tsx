import cls from "./Header.module.css"
import logo from '../../../shared/ui/ui-icon/icons/logo.svg';
import { Profile, ProfileSkeleton } from "../../../widgets/profile";
import { useAppSelector } from "../../../shared/lib";
import { selectUserLoadingStatus } from "../../../entities/user";
import { RequestStatus } from "../../../shared/model";

export const Header = () => {
	const userLoadingStatus = useAppSelector(selectUserLoadingStatus);

	return (
		<header className={cls.header}>
			<img
				src={logo}
				alt="mesto-logo"
				className={cls.logo}
			/>

			{userLoadingStatus === RequestStatus.Loading ?
				<ProfileSkeleton /> :
				<Profile/>
			}

		</header>
	);
}
