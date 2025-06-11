import { useEffect, useState } from "react"
import "./Login.css"
import { alertaError, generarToken, alertaRedirecion } from "../helpers/funciones";
import { useNavigate, Link } from "react-router-dom";
let apiUsuarios = "http://localhost:4000/usuarios";
function Login (){
  const [getEmail,setEmail] = useState ("")
  const [getContrasena,setContrasena] = useState ("")
  const [usuarios, setUsuarios] = useState([]);
  let navigate = useNavigate();
  
  
  function getUsuarios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

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
      alertaRedirecion(
        navigate,
        "Bienvenido " + buscarUsuarios().apiUsuarios,
        "En breves segundos será redireccionado a la pagina principal",
        "success",
        "/home"
      );
  
  }else {
    alertaError("ERROR", "Email Y/O Contraseña incorrectos", "error")
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
            value={getContrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required 
          />
        </div>

        <button type="submit" onClick={inicioSesion}>Entrar</button>
        <Link to= "/registro" className = "link">¿no tienes cuenta?</Link>
      </form>
    </div>
    )
}
export default Login
