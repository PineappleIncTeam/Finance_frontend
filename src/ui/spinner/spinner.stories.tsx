import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import Spinner from "./spinner";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
	title: "UI/Spinner",
	component: Spinner,
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
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	parameters: {
		layout: "centered",
	},
};
