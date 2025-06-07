import RutaProtegida from "../components/RutaProtegida";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";

export let enrutador = [
{
    path: "/home/",
    element:<RutaProtegida proteger={<Home/>} /> ,
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