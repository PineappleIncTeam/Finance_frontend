import { Control, FieldValues, Path } from "react-hook-form";


export interface ICategorySelect<T extends FieldValues> {
	label: string; 
	options: string[];
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	onRemoveCategory?: (category: string) => void;
  }
  