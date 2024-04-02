import { Routes, Route, Navigate } from "react-router-dom";

import Rectangle from "../../components/Rectangle";
import AuthReg from "../../components/registration-page/auth/AuthReg";
import NewPass from "../../components/registration-page/recoveryPage/NewPass";
import RecoveryPass from "../../components/registration-page/recoveryPage/RecoveryPass";
import RegistPage from "../../components/registration-page/registPage/RegistPage";

import { AuthPath } from "./routes";

const IntroRouteList = () => {
	return (
		<Routes>
			<Route path={AuthPath.Login} element={<AuthReg />} />
			<Route path={AuthPath.Signup} element={<RegistPage />} />
			<Route path={AuthPath.RectanglePage} element={<Navigate to="/rectangle/mainfield" />} />
			<Route path={AuthPath.RectanglePage + "/*"} element={<Rectangle />} />
			<Route path={AuthPath.RecoveryPassword} element={<RecoveryPass />} />
			<Route path={AuthPath.NewPassword} element={<NewPass />} />
		</Routes>
	);
};

export default IntroRouteList;
