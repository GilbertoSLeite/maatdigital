import {  BrushOutlined, CollectionsBookmarkOutlined, DescriptionOutlined, EditAttributesOutlined, HomeWork, HowToRegOutlined, LibraryBooksOutlined, MenuBookOutlined, PublicOutlined, SchoolOutlined, SortByAlphaOutlined, VpnKeyOutlined } from "@material-ui/icons";
import TelaAutor from "./pages/books/author/homeAuthor";
import AreaConhecimento from "./pages/books/areaConhecimento/areaConhecimento";
import TelaOrganizador from "./pages/books/organizer/homeOrganizer";
import Paises from "./pages/countries/countries";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import TelaGraduacao from "./pages/register/graduation/homeGraduation";
import TelaEditora from "./pages/register/publisher/homePublisher";
import TelaEditor from "./pages/books/editor/homeEditor"
import TelaCoordenador from "./pages/books/coordinator/homeCoordinator";
import TelaRespCapa from "./pages/books/cover/homeCover";
import TelaDiagramador from "./pages/books/diagramming/homeDiagramming";
import TelaLivros from "./pages/books/book/homeBooks";

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
        path: '/maatdigital/areaconhecimento',
        name: 'Organização',
        children: AreaConhecimento,
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
    {
        path: '/maatdigital/coordenador',
        name: 'Coordenador',
        children: TelaCoordenador,
        icon: HowToRegOutlined,
        private: true,
        loginPage: false,  
    }, 
    {
        path: '/maatdigital/organizador',
        name: 'Organizador',
        children: TelaOrganizador,
        icon: SortByAlphaOutlined,
        private: true,
        loginPage: false,  
    }, 
    {
        path: '/maatdigital/editor',
        name: 'Editor',
        children: TelaEditor,
        icon: EditAttributesOutlined,
        private: true,
        loginPage: false,  
    },
    {
        path: '/maatdigital/respcapa',
        name: 'Resp. pela Capa',
        children: TelaRespCapa,
        icon: CollectionsBookmarkOutlined,
        private: true,
        loginPage: false,  
    },
    {
        path: '/maatdigital/diagramador',
        name: 'Diagramador',
        children: TelaDiagramador,
        icon: BrushOutlined,
        private: true,
        loginPage: false,  
    },
    {
        path: '/maatdigital/autor',
        name: 'Autor',
        children: TelaAutor,
        icon: DescriptionOutlined,
        private: true,
        loginPage: false,  
    },
    {
        path: '/maatdigital/livros',
        name: 'Livros',
        children: TelaLivros,
        icon: MenuBookOutlined,
        private: true,
        loginPage: false,  
    },
];

export default pageRoutes;