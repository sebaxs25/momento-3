import { useState } from "react"
import "./Login.css"
import { alertaError, generarToken } from "../helpers/funciones";
import { useNavigate } from "react-router-dom";

function Login (){
  const [getEmail,setEmail] = useState ("")
  const [getContraseña,setContraseña] = useState ("")
  const [usuarios, setUsuarios] = useState([]);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

function buscarUsuarios(){
      let usuarioEncontrado = usuarios.find(
      (usuarios) =>
        getEmail == usuarios.email && getContrasena == usuarios.contrasena
    )
    return usuarioEncontrado
}

function inicioSesion(){
  if (buscarUsuarios()){
    let tokenAcceso = generarToken();
    localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(buscarUsuarios()));
      alertaRedireccion(
        navigate,
        "Bienvenido " + buscarUsuarios().usuarios,
        "En breves segundos será redireccionado al Home",
        "success",
        "/home"
      );
  
  }else {
    alertaError()
  }

}

    return(
        <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={getEmail}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={getContraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required 
          />
        </div>

        <button type="submit" onClick={inicioSesion}>Entrar</button>
      </form>
    </div>
    )
}
export default Login
