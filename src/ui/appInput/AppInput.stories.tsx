import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TAppInputStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";
import { InputTypeList } from "../../helpers/Input";
import { fieldConstants } from "../../helpers/storybookConstants";

import AppInput from "./AppInput";

const AppInputStory = (inputProps: TAppInputStory) => {
	const { control } = useForm({
		defaultValues: {
			exampleField: inputProps.defaultValue || "",
		},
	});

	return <AppInput {...inputProps} control={control as unknown as Control<FieldValues>} name="exampleField" />;
};

const meta = {
	title: "UI/AppInput",
	component: AppInputStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент поля ввода с поддержкой react-hook-form",
			},
		},
	},
	decorators: [
		(Story) => (
			<HighlightWrapper padding="90px 160px">
				<Story />
			</HighlightWrapper>
		),
	],
	argTypes: {
		label: {
			description: "Текст метки компонента",
			control: {
				type: "text",
			},
		},
		type: {
			description: "Тип поля ввода",
			control: {
				type: "select",
				options: Object.values(InputTypeList),
			},
		},
		placeholder: {
			description: "Текст подсказки",
			control: {
				type: "text",
			},
		},
		subtitle: {
			description: "Дополнительный текст под полем ввода",
			control: {
				type: "text",
			},
		},
		error: {
			description: "Текст ошибки",
			control: {
				type: "text",
			},
		},
		disabled: {
			description: "Отключено ли поле ввода",
			control: {
				type: "boolean",
			},
		},
		autoComplete: {
			description: "Значение атрибута autoComplete",
			control: {
				type: "text",
			},
		},
		defaultValue: {
			description: "Значение по умолчанию",
			control: {
				type: "text",
			},
		},
		control: {
			table: {
				disable: true,
			},
		},
		name: {
			table: {
				disable: true,
			},
		},
		rules: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		control: undefined as unknown as Control<FieldValues>,
		name: "exampleField",
		disabled: false,
		defaultValue: "",
		type: InputTypeList.Text,
		placeholder: fieldConstants.commonPlaceholder,
	},
} satisfies Meta<typeof AppInputStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultVariant",
		label: "Поле ввода",
	},
};

export const PasswordVariant: Story = {
	args: {
		key: "passwordVariant",
		label: "Пароль",
		type: InputTypeList.Password,
		placeholder: "Введите пароль",
	},
};

export const WithSubtitleVariant: Story = {
	args: {
		key: "withSubtitleVariant",
		label: "Поле с подсказкой",
		subtitle: "Дополнительная информация о поле",
	},
};

export const WithErrorVariant: Story = {
	args: {
		key: "withErrorVariant",
		label: "Поле с ошибкой",
		error: "Текст ошибки",
	},
};

export const DisabledVariant: Story = {
	args: {
		key: "disabledVariant",
		label: "Отключенное поле",
		placeholder: "Недоступно для ввода",
		disabled: true,
	},
};

export const EmailVariant: Story = {
	args: {
		key: "emailVariant",
		label: "Email",
		type: InputTypeList.Email,
		placeholder: "Введите email",
		autoComplete: "email",
	},
};

export const NumberVariant: Story = {
	args: {
		key: "numberVariant",
		label: "Число",
		type: InputTypeList.Number,
		placeholder: "Введите число",
	},
};

export const WithDefaultValueVariant: Story = {
	args: {
		key: "withDefaultValueVariant",
		label: "Поле с значением по умолчанию",
		defaultValue: "Значение по умолчанию",
	},
};
