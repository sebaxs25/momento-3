import RutaProtegida from "../components/RutaProtegida";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Registro from "../pages/Registro";
import Suscripciones from "../pages/Suscripciones";

export let enrutador = [
{
    path: "/home/",
    element:<RutaProtegida proteger={<Home/>} /> ,
    children: [
    {
        path: "registrar",
        element:<Registrar/>
    },
    {
       path: "suscripciones",
       element: <Suscripciones/>
    }
    ]

},
{
    path: "/",
    element: <Login/>
}, 
{
    path: "/registro",
    element: <Registro/>
}
]