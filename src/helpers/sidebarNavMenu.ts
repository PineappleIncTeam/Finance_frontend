import { UserProfileArchive } from "../components/userProfileLayout/userProfileArchive/userProfileArchive";
import { UserProfileAvatarSettings } from "../components/userProfileLayout/userProfileAvatarSettings/userProfileAvatarSettings";
import { UserProfileChangePassword } from "../components/userProfileLayout/userProfileChangePassword/userProfileChangePassword";
import { UserProfilePrivateAppSettings } from "../components/userProfileLayout/userProfilePrivateAppSettings/userProfilePrivateAppSettings";
import { UserProfilePrivateData } from "../components/userProfileLayout/userProfilePrivateData/userProfilePrivateData";

export const sidebarNavMenu = [
	{ title: "Личные данные", content: UserProfilePrivateData },
	{ title: "Аватар", content: UserProfileAvatarSettings },
	{ title: "Сменить пароль", content: UserProfileChangePassword },
	{ title: "Настройки", content: UserProfilePrivateAppSettings },
	{ title: "Архив", content: UserProfileArchive },
];
