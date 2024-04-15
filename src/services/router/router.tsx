import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import Service from "../../pages/mainLayout/service/Service";
import NotFound from "../../pages/mainLayout/notFound/NotFound";

import { UserProfileLayout } from "../../layouts/userProfileLayout/UserProfileLayout";
import ProfitPage from "../../pages/userProfileLayout/profitPage/ProfitPage";
import SpendingMoneyPage from "../../pages/userProfileLayout/spendingMoneyPage/SpendingMoneyPage";

import { MainPath, UserProfilePath } from "./routes";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<MainLayout />}>
				<Route index path={MainPath.Main} element={<Service />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route element={<UserProfileLayout />}>
				<Route path={UserProfilePath.Profit} element={<ProfitPage />} />
				<Route path={UserProfilePath.SpendingMoney} element={<SpendingMoneyPage />} />
			</Route>
		</>,
	),
);

export default router;
