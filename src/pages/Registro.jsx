import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
function Registro (){
    const [getUsuario, setUsuario] = useState ("")
    const [getEmail,setEmail] = useState ("")
    const [getContraseña,setContraseña] = useState ("")
    const [getConfirmarContraseña,setConfirmarContraseña] = useState ("")
    let navigate = useNavigate()
    
  const handleSubmit = (e) => {
    e.preventDefault();
    

  } 
    return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <div className="input-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={getUsuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

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

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={getConfirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrarse</button>
        <Link to= "/">¿ya tienes cuenta?</Link>
      </form>
    </div>
  );

}
export default Registro