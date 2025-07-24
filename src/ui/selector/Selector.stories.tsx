import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TSelectorStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";
import { TAuthInputForm } from "../../types/common/UiKitProps";

import { Selector } from "./Selector";

const SelectorStory = <T extends TAuthInputForm>(props: TSelectorStory<T>) => {
	const { control } = useForm({
		defaultValues: {
			[props.name]: props.defaultValue || "",
		},
	});

	return (
		<div style={{ width: "300px" }}>
			<Selector
				control={control as unknown as Control<T>}
				name={props.name}
				label={props.label}
				options={props.options}
				placeholder={props.placeholder}
			/>
		</div>
	);
};

const meta = {
	title: "UI/Selector",
	component: SelectorStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент селектора с поддержкой react-hook-form",
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
		placeholder: {
			description: "Текст подсказки",
			control: {
				type: "text",
			},
		},
		options: {
			description: "Варианты выбора",
			control: {
				type: "multi-select",
			},
		},
		defaultValue: {
			description: "Значение по умолчанию",
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
	args: {
		name: "email",
	},
} satisfies Meta<typeof SelectorStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultSelectorVariant",
		label: "Выберите опцию",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
		defaultValue: "",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};

export const WithDefaultValueVariant: Story = {
	args: {
		key: "withDefaultValueVariant",
		label: "Выберите опцию",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
		defaultValue: "Опция 2",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};

export const WithoutLabelVariant: Story = {
	args: {
		key: "withoutLabelVariant",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
		defaultValue: "",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};

export const CountrySelectVariant: Story = {
	args: {
		key: "countrySelectVariant",
		label: "Выберите страну",
		placeholder: "Страна...",
		options: ["Россия", "США", "Германия", "Франция", "Япония", "Китай"],
		defaultValue: "",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};

export const CitySelectVariant: Story = {
	args: {
		key: "citySelectVariant",
		label: "Выберите город",
		placeholder: "Город...",
		options: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"],
		defaultValue: "",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};

export const CurrencySelectVariant: Story = {
	args: {
		key: "currencySelectVariant",
		label: "Валюта",
		placeholder: "Выберите валюту",
		options: ["RUB", "USD", "EUR"],
		defaultValue: "",
		disabled: false,
		control: undefined as unknown as Control<FieldValues>,
	},
};
