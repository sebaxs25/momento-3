import { Link, useNavigate } from "react-router-dom" 
import { alertaRedirecion } from "../helpers/funciones"



function MenuLateral(){
     let navigate = useNavigate()
     let usuario = JSON.parse(localStorage.getItem("usuario"))
  function cerrarSesion() {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("usuario")
    alertaRedirecion(navigate, "Sesion finalizada", "En Breves segundos cerraremos la sesión", "info", "/")
  }

    return(
    <aside className="menu_lateral">
      <h2 className="logo">🎬 CineApp</h2>
      <nav className="menu_links">
        <Link to="/home" className="link_item">Inicio</Link>
        <Link to="registrar" className="link_item">Registrar</Link>
        <Link to="suscripciones" className="link_item"></Link>
        <Link to="/" className="link_item"></Link>
        <button onClick={cerrarSesion} type='button' className="">Cerrar sesión</button>
        </nav>
    </aside>
    )
}
export default MenuLateral