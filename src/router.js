import React from 'react';
import TelaAutor from "./pages/register/author/homeAuthor";
import AreaConhecimento from "./pages/register/areaConhecimento/areaConhecimento";
import TelaOrganizador from "./pages/register/coordinator/homeCoordinator";
import Paises from "./pages/countries/countries";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import TelaGraduacao from "./pages/register/graduation/homeGraduation";
import TelaEditora from "./pages/register/publisher/homePublisher";
import TelaEditor from "./pages/register/editor/homeEditor"
import TelaCoordenador from "./pages/register/coordinator/homeCoordinator";
import TelaRespCapa from "./pages/register/cover/homeCover";
import TelaDiagramador from "./pages/register/diagramming/homeDiagramming";
import TelaLivros from "./pages/books/homeBooks";
import MiniDrawerMaat from './components/appBar/appBarMaat';

const isAuth = localStorage.getItem('@maatdigital/isAuthenticated');

const authenticated = [
    {
        path: 'maatdigital',
        children: [  
            { path: 'acessar', element:<MiniDrawerMaat Main={<Home />} /> },        
            { path: 'home', element: <MiniDrawerMaat Main={<Home /> } /> },    
            { path: 'areaconhecimento', element: <MiniDrawerMaat Main={<AreaConhecimento /> } />  },  
            { path: 'graduacao', element: <MiniDrawerMaat Main={<TelaGraduacao /> } />  },  
            { path: 'paises', element: <MiniDrawerMaat Main={<Paises /> } />  },  
            { path: 'editora', element: <MiniDrawerMaat Main={<TelaEditora /> } />  },  
            { path: 'coordenador', element: <MiniDrawerMaat Main={<TelaCoordenador /> } />  },  
            { path: 'organizador', element: <MiniDrawerMaat Main={<TelaOrganizador />}/>  },  
            { path: 'editor', element: <MiniDrawerMaat Main={<TelaEditor /> } />  },  
            { path: 'respcapa', element: <MiniDrawerMaat Main={<TelaRespCapa /> } />  },  
            { path: 'diagramador', element: <MiniDrawerMaat Main={<TelaDiagramador /> } />  },  
            { path: 'autor', element: <MiniDrawerMaat Main={<TelaAutor /> } />  },  
            { path: 'livros', element: <MiniDrawerMaat Main={<TelaLivros /> } />  },  
            { path: '*', element: <MiniDrawerMaat Main={<Home />} />  },  
        ],
    },
    {
        path: '/',
        children: [
            { path: '/', element: <MiniDrawerMaat Main={<Home />} /> },  
            { path: '*', element: <MiniDrawerMaat Main={<Home />} />  },
        ]
    }
];

const unauthenticated  =  [
    {
        path: 'maatdigital',
        children: [
            { path: 'acessar',element:<MiniDrawerMaat Main={<Login />} /> },         
            { path: 'home', element: <MiniDrawerMaat Main={<Login /> } /> },    
            { path: 'areaconhecimento', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'graduacao', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'paises', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'editora', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'coordenador', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'organizador', element: <MiniDrawerMaat Main={<Login />}/>  },  
            { path: 'editor', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'respcapa', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'diagramador', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'autor', element: <MiniDrawerMaat Main={<Login /> } />  },  
            { path: 'livros', element: <MiniDrawerMaat Main={<Login /> } />  },  
        ],
    },
    {
        path: '/',
        children: [
            { path: '/', element: <MiniDrawerMaat Main={<Login />} /> },  
            { path: '*', element: <MiniDrawerMaat Main={<Login />} />  },
        ]
    }
]

const pageRoutes = (isAuth ? authenticated : unauthenticated);

export default pageRoutes;