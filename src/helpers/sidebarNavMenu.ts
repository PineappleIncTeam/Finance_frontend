import { PrivateProfileArchive } from "../components/userProfileLayout/privateProfileElements/archive/privateProfileArchive";
import { PrivateProfileAvatarSettings } from "../components/userProfileLayout/privateProfileElements/avatarSettings/privateProfileAvatarSettings";
import { PrivateProfileChangePassword } from "../components/userProfileLayout/privateProfileElements/changePassword/privateProfileChangePassword";
import { PrivateProfilePrivateAppSettings } from "../components/userProfileLayout/privateProfileElements/privateAppSettings/privateProfilePrivateAppSettings";
import { PrivateProfilePrivateData } from "../components/userProfileLayout/privateProfileElements/privateData/privateProfilePrivateData";

export const sidebarNavMenu = [
	{ title: "Личные данные", content: PrivateProfilePrivateData },
	{ title: "Аватар", content: PrivateProfileAvatarSettings },
	{ title: "Сменить пароль", content: PrivateProfileChangePassword },
	{ title: "Настройки", content: PrivateProfilePrivateAppSettings },
	{ title: "Архив", content: PrivateProfileArchive },
];
