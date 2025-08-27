import { Meta, StoryObj } from "@storybook/nextjs";
import { Control, FieldValues, useForm } from "react-hook-form";
import React from "react";

import { TSwitcherStory } from "../../types/common/StorybookElementProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";
import { TAuthInputForm } from "../../types/common/UiKitProps";

import Switcher from "./switcher";

const SwitcherStory = <T extends TAuthInputForm>(props: TSwitcherStory<T>) => {
	const { control } = useForm({
		defaultValues: {
			[props.name]: props.defaultValue || false,
		},
	});

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<Switcher control={control as unknown as Control<T>} name={props.name} label={props.label} />
		</div>
	);
};

const meta = {
	title: "UI/Switcher",
	component: SwitcherStory,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Компонент переключателя с поддержкой react-hook-form",
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
		defaultValue: {
			description: "Значение по умолчанию",
			control: {
				type: "boolean",
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
		control: undefined as unknown as Control<FieldValues>,
		disabled: false,
		defaultValue: false,
	},
} satisfies Meta<typeof SwitcherStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		key: "defaultSwitcherVariant",
		label: "Стандартный переключатель",
	},
};

export const EnabledVariant: Story = {
	args: {
		key: "enabledVariant",
		label: "Включенный переключатель",
		defaultValue: true,
	},
};

export const DisabledVariant: Story = {
	args: {
		key: "disabledVariant",
		label: "Отключенный переключатель",
		disabled: true,
	},
};

export const DisabledEnabledVariant: Story = {
	args: {
		key: "disabledEnabledVariant",
		label: "Неактивный включенный переключатель",
		defaultValue: true,
		disabled: true,
	},
};

export const NotificationsVariant: Story = {
	args: {
		key: "notificationsVariant",
		label: "Получать уведомления",
	},
};

export const DarkThemeVariant: Story = {
	args: {
		key: "darkThemeVariant",
		label: "Темная тема",
	},
};
