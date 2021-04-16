import { HomeWork, VpnKeyOutlined } from "@material-ui/icons";
import Home from "./Pages /Home/home";
import Login from "./Pages /Login/login";

const pageRoutes = [
    {
        path: '/maatdigital/login',
        name: 'Login',
        children: Login,
        icon: VpnKeyOutlined,
        private: false,
    },
    {
        path: '/maatdigital/home',
        name: 'Home',
        children: Home,
        icon: HomeWork,
        private: false,
    },
];

export default pageRoutes;