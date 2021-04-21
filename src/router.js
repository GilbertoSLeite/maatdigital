import {  CollectionsBookmarkOutlined, HomeWork, LibraryBooksOutlined, PublicOutlined, SchoolOutlined, VpnKeyOutlined } from "@material-ui/icons";
import DDC from "./pages/books/ddc/ddc";
import Paises from "./pages/countries/countries";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import TelaGraduacao from "./pages/register/graduation/homegraduation";
import TelaEditora from "./pages/register/publisher/homepublisher";

const pageRoutes = [
    {
        path: '/maatdigital/acessar',
        name: 'Login',
        children: Login,
        icon: VpnKeyOutlined,
        private: false,
        loginPage: true,
    },
    {
        path: '/maatdigital/home',
        name: 'Home',
        children: Home,
        icon: HomeWork,
        private: true,
        loginPage: false,
    },
    {
        path: '/maatdigital/ddc',
        name: 'Organização',
        children: DDC,
        icon: CollectionsBookmarkOutlined,
        private: true,
        loginPage: false,
    },
    {
        path: '/maatdigital/graduacao',
        name: 'Graduação',
        children: TelaGraduacao,
        icon: SchoolOutlined,
        private: true,
        loginPage: false, Paises
    },
    {
        path: '/maatdigital/paises',
        name: 'País',
        children: Paises,
        icon: PublicOutlined,
        private: true,
        loginPage: false,  
    },
    {
        path: '/maatdigital/editora',
        name: 'Editora',
        children: TelaEditora,
        icon: LibraryBooksOutlined,
        private: true,
        loginPage: false,  
    },
];

export default pageRoutes;