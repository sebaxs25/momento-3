import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertaRedirecion } from "../helpers/funciones";
import "./Home.css"

function Registrar() {
    const [nombre, setNombre] = useState("");
    const [costo, setCosto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const navigate = useNavigate();
    let apiUsuarios = "http://localhost:4000/usuarios";
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    function registrarOpcion() {
        let nuevoRegistro = {
            nombre, costo, categoria, fecha
        }
        fetch(apiUsuarios, {
            method: "POST",
            body: JSON.stringify(nuevoRegistro),
        }).then(() => {
            alertaRedirecion(
                navigate,
                "Gracias",
                "Nuevo registro creado perfectamente",
                "success",
                "/home/suscripciones"
            )
        });
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h2>Registrar nueva suscripción</h2>
            <input type="text" placeholder="Nombre del servicio" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="number" placeholder="Costo mensual" value={costo} onChange={(e) => setCosto(e.target.value)} required />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option>películas</option>
                <option>series</option>
                <option>deportes</option>
                <option>documentales</option>
            </select>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            <button type="submit" onClick={registrarOpcion}>Registrar</button>
        </form>
    );
}

export default Registrar;