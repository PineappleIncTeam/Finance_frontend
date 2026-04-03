import { Meta, StoryObj } from "@storybook/nextjs";

import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import Title from "./Title";

const meta = {
	title: "UI/Title",
	component: Title,
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
		title: {
			description: "Контент компонента Title",
			control: {
				type: "text",
			},
		},
	},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		title: "DefaultVariant",
	},
};
