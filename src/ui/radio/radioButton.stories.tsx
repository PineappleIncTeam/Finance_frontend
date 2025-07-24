import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TRadioButtonStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import { RadioButton } from "./radioButton";

const RadioButtonStory = <T extends FieldValues>(props: TRadioButtonStory<T>) => {
	const { control } = useForm({
		defaultValues: {
			[props.name]: props.value,
		},
	});

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<RadioButton
				control={control as unknown as Control<FieldValues>}
				name={props.name}
				value={props.value}
				label={props.label}
			/>
		</div>
	);
};

const meta = {
	title: "UI/RadioButton",
	component: RadioButtonStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент радиокнопки с поддержкой react-hook-form",
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
		value: {
			description: "Значение радиокнопки",
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
	},
} satisfies Meta<typeof RadioButtonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultRadioButtonVariant",
		label: "Стандартная радиокнопка",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
		name: "defaultRadioGroup",
		value: "option1",
	},
};

export const SecondOptionVariant: Story = {
	args: {
		key: "secondOptionVariant",
		label: "Вторая опция",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
		name: "defaultRadioGroup",
		value: "option2",
	},
};

export const DisabledVariant: Story = {
	args: {
		key: "disabledVariant",
		label: "Отключенная радиокнопка",
		disabled: true,
		control: undefined as unknown as Control<FieldValues>,
		name: "disabledRadioGroup",
		value: "option1",
	},
};

export const GenderMaleVariant: Story = {
	args: {
		key: "genderMaleVariant",
		label: "Мужской",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
		name: "gender",
		value: "male",
	},
};

export const GenderFemaleVariant: Story = {
	args: {
		key: "genderFemaleVariant",
		label: "Женский",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
		name: "gender",
		value: "female",
	},
};
