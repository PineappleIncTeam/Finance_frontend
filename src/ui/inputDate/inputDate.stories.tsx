import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TInputDateStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";
import { weekDayCount } from "../../helpers/storybookConstants";

import InputDate from "./inputDate";

const InputDateStory = ({ name, defaultValue, isPeriod, isLabel }: TInputDateStory<FieldValues>) => {
	const { control } = useForm({
		defaultValues: {
			[name]: defaultValue || null,
		},
	});

	return (
		<InputDate control={control as unknown as Control<FieldValues>} name={name} isPeriod={isPeriod} isLabel={isLabel} />
	);
};

const meta = {
	title: "UI/InputDate",
	component: InputDateStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент выбора даты с поддержкой react-hook-form",
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
		isPeriod: {
			description: "Выбор периода (диапазона дат)",
			control: {
				type: "boolean",
			},
		},
		isLabel: {
			description: "Отображать ли метку компонента",
			control: {
				type: "boolean",
			},
		},
		defaultValue: {
			description: "Значение по умолчанию",
			control: {
				type: "date",
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
	args: {
		control: undefined as unknown as Control<FieldValues>,
		isPeriod: false,
	},
} satisfies Meta<typeof InputDateStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultDateVariant",
		isLabel: true,
		defaultValue: new Date(),
		name: "defaultDate",
	},
};

export const PeriodVariant: Story = {
	args: {
		key: "periodVariant",
		isPeriod: true,
		isLabel: true,
		defaultValue: [new Date(), new Date(new Date().setDate(new Date().getDate() + weekDayCount))],
		name: "periodDate",
	},
};

export const WithoutLabelVariant: Story = {
	args: {
		key: "withoutLabelVariant",
		isLabel: false,
		defaultValue: new Date(),
		name: "withoutLabelDate",
	},
};

export const PeriodWithoutLabelVariant: Story = {
	args: {
		key: "periodWithoutLabelVariant",
		isPeriod: true,
		isLabel: false,
		defaultValue: [new Date(), new Date(new Date().setDate(new Date().getDate() + weekDayCount))],
		name: "periodWithoutLabelDate",
	},
};

export const EmptyDateVariant: Story = {
	args: {
		key: "emptyDateVariant",
		isLabel: true,
		defaultValue: new Date(),
		name: "emptyDate",
	},
};

export const EmptyPeriodVariant: Story = {
	args: {
		key: "emptyPeriodVariant",
		isPeriod: true,
		isLabel: true,
		defaultValue: [null, null],
		name: "emptyPeriodDate",
	},
};
