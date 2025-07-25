import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TSelectorStory } from "../../types/common/StorybookElementProps";
import { TAuthInputForm } from "../../types/common/UiKitProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";
import { fieldConstants } from "../../helpers/storybookConstants";

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
		control: undefined as unknown as Control<FieldValues>,
		disabled: false,
		name: "email",
		defaultValue: "",
		label: fieldConstants.commonSelectorLabel,
	},
} satisfies Meta<typeof SelectorStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultSelectorVariant",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
	},
};

export const DisabledVariant: Story = {
	args: {
		key: "disabledSelectorVariant",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
		disabled: true,
	},
};

export const WithDefaultValueVariant: Story = {
	args: {
		key: "withDefaultValueVariant",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
		defaultValue: "Опция 2",
	},
};

export const WithoutLabelVariant: Story = {
	args: {
		key: "withoutLabelVariant",
		placeholder: "Опция N",
		options: ["Опция 1", "Опция 2", "Опция 3"],
	},
};

export const CountrySelectVariant: Story = {
	args: {
		key: "countrySelectVariant",
		label: "Выберите страну",
		placeholder: "Страна...",
		options: ["Россия", "США", "Германия", "Франция", "Япония", "Китай"],
	},
};

export const CitySelectVariant: Story = {
	args: {
		key: "citySelectVariant",
		label: "Выберите город",
		placeholder: "Город...",
		options: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"],
	},
};

export const CurrencySelectVariant: Story = {
	args: {
		key: "currencySelectVariant",
		label: "Валюта",
		placeholder: "Выберите валюту",
		options: ["RUB", "USD", "EUR"],
	},
};
