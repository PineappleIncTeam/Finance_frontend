import { Meta, StoryObj } from "@storybook/nextjs";

import { TAppButtonStyle, TAppButtonType } from "../../types/common/UiKitProps";
import { HighlightWrapper } from "../../components/mainLayout/highlightWrapper/HighlightWrapper";

import Button from "./Button1";

const meta = {
	title: "UI/Button",
	component: Button,
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
		type: {
			description: "Тип кнопки",
			control: {
				type: "select",
			},
		},
		className: {
			description: "Название дополнительного класса стилей",
			control: {
				type: "text",
			},
		},
		variant: {
			description: "Название дополнительного класса стилей",
			control: {
				type: "select",
			},
		},
		isLarge: {
			description: "Является ли элемент большим?",
			control: {
				type: "boolean",
			},
		},
		children: {
			description: "Перечисление структуры потомков",
			control: {
				type: "object",
			},
		},
		onClick: {
			description: "Описание функции при нажатии",
			control: {
				type: "object",
			},
		},
	},
	args: {
		type: ["button", "submit"] as unknown as TAppButtonType,
		className: "buttonStyle",
		isLarge: false,
		variant: "contained",
		children: <>Button</>,
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
	args: {
		variant: "contained" as unknown as TAppButtonStyle,
	},
};

export const SubmitVariant: Story = {
	args: {
		type: "submit" as unknown as TAppButtonType,
		variant: ["contained", "outlined", "warning", "notification", "faded"] as unknown as TAppButtonStyle,
	},
};

export const LargeVariant: Story = {
	args: {
		variant: ["contained", "outlined", "warning", "notification", "faded"] as unknown as TAppButtonStyle,
		isLarge: true,
	},
};

export const ContainedVariant: Story = {
	args: {
		variant: "contained" as unknown as TAppButtonStyle,
	},
};

export const OutlinedVariant: Story = {
	args: {
		variant: "outlined" as unknown as TAppButtonStyle,
	},
};

export const WarningVariant: Story = {
	args: {
		variant: "outlined" as unknown as TAppButtonStyle,
	},
};

export const NotificationVariant: Story = {
	args: {
		variant: "notification" as unknown as TAppButtonStyle,
	},
};

export const FadedVariant: Story = {
	args: {
		variant: "faded" as unknown as TAppButtonStyle,
	},
};
