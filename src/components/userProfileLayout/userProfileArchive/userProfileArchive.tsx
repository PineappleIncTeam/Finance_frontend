import { archiveList } from "../../../mocks/PrivateProfileArchive";
import { ArchiveItem } from "../userProfileArchiveItem/userProfileArchiveItem";

import style from "./userProfileArchive.module.scss";

export const Archive = () => {
	return (
		<div className={style.archiveForm}>
			<p className={style.archiveTitle}>Архив</p>
			<div className={style.archive__items}>
				{archiveList.map((archiveItemValue, index) => {
					return <ArchiveItem archiveItemValue={archiveItemValue} key={index} />;
				})}
			</div>
		</div>
	);
};
