import { StaticImageData } from "next/image";
import { Control, FieldValues, Path, UseControllerProps } from "react-hook-form";
import { MouseEvent, ReactNode } from "react";

import { IAddCategoryExpensesForm, IApiErrorState, IEditTransactionForm } from "../components/ComponentsTypes";
import { IArchiveCategory } from "../pages/Expenses";
import { IOperation } from "../api/Expenses";
import { CategoryType } from "../../helpers/categoryTypes";
import { ISavingsTargetAddForm } from "../pages/Savings";
import { ITarget } from "../api/Savings";
import { ICalculatorForm } from "../pages/Calculator";

export type CustomLayout = () => Element;

export interface INewPasswordModal {
	email: string;
	open: boolean;
	toggle: () => void;
}

export interface IChangePasswordModal {
	open: boolean;
}

export interface IBlogCard {
	image: string | StaticImageData;
	date: string;
	descriptionImage: string;
	text: string;
	blogAction: () => void;
	id?: string;
}

export interface INavBar {
	onClick?: () => void;
}

export interface IBlogArticle {
	image?: string;
	date: string;
	title: string;
	articleContent: string[];
	articleAction?: () => void;
	id: string;
}

export interface ITooltip {
	open: boolean;
	toggle?: () => void;
	text?: string;
}

export interface IAboutUsCard {
	photo: string | StaticImageData;
	teamRole: string;
}

export interface ITeamMember {
	teamRole: string;
	photo: StaticImageData;
}

export interface IFooter {
	isMainPage?: boolean;
}

export interface IArchiveItem {
	archiveItemValue: string;
	onMouseEnter: undefined | ((event: MouseEvent<HTMLDivElement>) => void);
	onMouseLeave: undefined | (() => void);
}

export interface ISimpleTooltip {
	open: boolean;
	toggle?: () => void;
	text?: string;
	className?: string;
	top?: number;
	left?: number;
}

export interface IRenderProfileItem {
	title: string;
	handleClick: (title: string) => void;
}

export interface IRenderNavItem {
	title: string;
	link?: string;
}

export interface ISidebarMenu {
	handleClick: (title: string) => void;
}

export interface IHandleMouseEnterArchiveItem {
	(event: MouseEvent<HTMLDivElement>, content: string): void;
}

export interface ICategoryOption {
	id: number;
	name: string;
	is_income: boolean;
	is_outcome: boolean;
	is_deleted: boolean;
}

export interface ICategorySelect<T extends FieldValues> {
	label: string;
	options: ICategoryOption[] | ITarget[];
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	onAddCategory: () => void;
	onRemoveCategory?: (categoryId: number, categoryName: string) => void;
}

export interface IAddCategory {
	open: boolean;
	request: (data: IAddCategoryExpensesForm) => Promise<void>;
	onCancelClick: () => void;
	type: CategoryType;
}

export interface ITransactionDelete {
	open: boolean;
	remove: () => Promise<void>;
	cancelRemove: () => void;
}

export interface ITransactionDeleteSuccess {
	open: boolean;
}

export interface IEditTransaction {
	open: boolean;
	id: string;
	request: (id: string, data: IEditTransactionForm) => Promise<void>;
	cancelEdit: () => void;
}

export interface IEditTransactionSuccess {
	open: boolean;
}

export interface ICategoryDeleteModal {
	open: boolean;
	category: string;
	id: string;
	requestArchiveApi: (id: string, data: IArchiveCategory) => Promise<void> | undefined;
	requestDeleteApi: (id: string, name: string) => Promise<void>;
	onCancelClick: () => void;
	operations: IOperation[];
}

export interface IHighlightWrapper {
	children: ReactNode;
	padding?: string;
	shadowColor?: string;
}

export interface ICurtainVk {
	handleError: () => void;
}

export interface ISavingsCategory {
	open: boolean;
	request: (data: ISavingsTargetAddForm) => Promise<void>;
	onCancelClick: () => void;
}

export interface ISavingsTargetName {
	name: string;
}

export interface IResponseApiModal {
	text: string;
	open: boolean;
}

export interface IApiErrorModal {
	modalState: IApiErrorState;
	onClose: () => void;
}

export interface IPrivateRouteErrorModal {
	isOpen: boolean;
	closeModal: () => void;
}

export interface IAdditionalControlValues {
	id: string;
	title: string;
	value: string;
}

export interface ICalcRageInput extends UseControllerProps<ICalculatorForm> {
	label: string;
	maxValue: number;
	changeFieldValue: (value: string) => void;
	isPercentValue?: boolean;
	isAdditionalControl?: boolean;
	isAdditionalControlPercents?: boolean;
	loanAmountValue?: string;
	additionalControlValues?: IAdditionalControlValues[];
}
