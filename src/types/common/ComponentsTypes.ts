import { Control, FieldValues, Path } from "react-hook-form";

interface ICategoryOption {
	id: string;
	name: string; 
  }


export interface ICategorySelect<T extends FieldValues> {
	label: string; 
	options: ICategoryOption[];
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	onRemoveCategory?: (categoryId: string) => void;
  }
  