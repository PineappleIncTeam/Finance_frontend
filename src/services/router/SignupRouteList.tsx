import { Routes, Route, Navigate } from "react-router-dom";

import Rectangle from "../../pages/mainFieldPages/rectanglePage/Rectangle";
import LoginPage from "../../pages/authPages/loginPage/LoginPage";
import NewPass from "../../pages/authPages/recoveryPages/NewPass";
import RecoveryPass from "../../pages/authPages/recoveryPages/RecoveryPass";
import SignupPage from "../../pages/authPages/signupPage/SignupPage";

import { AuthPath } from "./routes";

const IntroRouteList = () => {
	return (
		<Routes>
			<Route path={AuthPath.Login} element={<LoginPage />} />
			<Route path={AuthPath.Signup} element={<SignupPage />} />
			<Route path={AuthPath.RectanglePage} element={<Navigate to="/rectangle/mainfield" />} />
			<Route path={AuthPath.RectanglePage + "/*"} element={<Rectangle />} />
			<Route path={AuthPath.RecoveryPassword} element={<RecoveryPass />} />
			<Route path={AuthPath.NewPassword} element={<NewPass />} />
		</Routes>
	);
};

export default IntroRouteList;
