import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { alertaError, alertaRedirecion } from "../helpers/funciones";
import "./Registro.css"
function Registro (){
const [usuario, setUsuario] = useState("");
const [email, setEmail] = useState("");
const [contrasena, setContrasena] = useState("");
const [confirmarContrasena, setConfirmarContrasena] = useState("");
const [usuarios,setUsuarios] = useState ([])
    let navigate = useNavigate()
    let apiUsuarios = "http://localhost:4000/usuarios";
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
  function buscarUsuario() {
    let usuarioEncontrado = usuarios.find(
      (usuarios) => usuarios == usuario.usuario
    );
    return usuarioEncontrado;
  }
  function registroUsuario() {
    if (!buscarUsuario()) {
      let nuevoUsuario = {
        usuario: usuario,
        email: email,
        contrasena: contrasena,
        confirmarContrasena: confirmarContrasena
      };
      fetch(apiUsuarios, {
        method: "POST",
        body: JSON.stringify(nuevoUsuario),
      }).then(() => {
        getUsuarios();
      }).catch((error) => console.log(error))
      alertaRedirecion(
        navigate,
        "El usuario registrado correctamente",
        "En breves segundos será redireccionado al login",
        "success",
        "/"
      );
         } else {
      alertaError("Error", "Usuario ya existe en la base de datos", "error");
    }

  }

  
    return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <div className="input-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            required
          />
        </div>

        <button type="submit" onClick={registroUsuario}>Registrarse</button>
        <Link to= "/">¿ya tienes cuenta?</Link>
      </form>
    </div>
  );
}

export default Registro