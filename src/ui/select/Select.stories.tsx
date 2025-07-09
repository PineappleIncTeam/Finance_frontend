import { Meta, StoryObj } from "@storybook/nextjs";

import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import { Select } from "./Select";

import "./Select.module.scss";

const meta = {
	title: "UI/Select",
	component: Select,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
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
		options: {
			description: "Варианты для выбора",
			control: {
				type: "multi-select",
			},
		},
		disabled: {
			description: "Активен ли компонент?",
			control: {
				type: "boolean",
			},
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	args: {
		label: "Селект",
		options: ["Вариант 1", "Вариант 2"],
		disabled: false,
	},
};
