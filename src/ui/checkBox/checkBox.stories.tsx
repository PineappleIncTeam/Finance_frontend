import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TCheckboxStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import CustomCheckbox from "./checkBox";

const CheckboxStory = <T extends FieldValues>(props: TCheckboxStory<T>) => {
	const { control } = useForm({
		defaultValues: {
			[props.name]: props.defaultValue || false,
		},
	});

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<CustomCheckbox control={control as unknown as Control<FieldValues>} name={props.name} />
			{props.label && <span>{props.label}</span>}
		</div>
	);
};

const meta = {
	title: "UI/Checkbox",
	component: CheckboxStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент чекбокса с поддержкой react-hook-form",
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
		disabled: {
			description: "Отключено ли поле ввода",
			control: {
				type: "boolean",
			},
		},
		defaultValue: {
			description: "Значение по умолчанию",
			control: {
				type: "boolean",
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
		disabled: false,
		defaultValue: false,
	},
} satisfies Meta<typeof CheckboxStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultCheckboxVariant",
		label: "Стандартный чекбокс",
		name: "defaultCheckbox",
	},
};

export const CheckedVariant: Story = {
	args: {
		key: "checkedVariant",
		label: "Отмеченный чекбокс",
		defaultValue: true,
		name: "checkedCheckbox",
	},
};

export const DisabledVariant: Story = {
	args: {
		key: "disabledVariant",
		label: "Отключенный чекбокс",
		disabled: true,
		name: "disabledCheckbox",
	},
};

export const DisabledCheckedVariant: Story = {
	args: {
		key: "disabledCheckedVariant",
		label: "Отключенный отмеченный чекбокс",
		disabled: true,
		defaultValue: true,
		name: "disabledCheckedCheckbox",
	},
};

export const AgreementVariant: Story = {
	args: {
		key: "agreementVariant",
		label: "Я соглашаюсь с политикой конфиденциальности",
		name: "agreementField",
	},
};

export const RememberMeVariant: Story = {
	args: {
		key: "rememberMeVariant",
		label: "Запомнить меня",
		name: "isRememberMe",
	},
};
