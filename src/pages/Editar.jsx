import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { guardarCambios } from "../helpers/funciones";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaRenovacion, setFechaRenovacion] = useState("");
  const apiUsuarios = "http://localhost:4000/suscripciones";

  useEffect(() => {
    fetch(`${apiUsuarios}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre || "");
        setCosto(data.costo || "");
        setCategoria(data.categoria || "");
        setFechaRenovacion(data.fechaRenovacion || "");
      })
      .catch((err) => console.log("Error cargando datos:", err));
  }, [id]);

  const actualizarSuscripcion = (e) => {
    e.preventDefault();
    const datosActualizados = {
      nombre,
      costo,
      categoria,
      fechaRenovacion,
    };

    fetch(`${apiUsuarios}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    })
      .then(() => {
        guardarCambios(
          navigate,
          "¡Actualizado!",
          "Los cambios se guardaron correctamente",
          "success",
          "/suscripciones"
        );
      })
      .catch((error) => console.log("Error actualizando:", error));
  };

  return (
    <div className="editar-container">
      <form className="editar-form" onSubmit={actualizarSuscripcion}>
        <h2>Editar Suscripción</h2>

        <div className="input-group">
          <label>Nombre del servicio</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Costo mensual</label>
          <input
            type="number"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Categoría</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Fecha de renovación</label>
          <input
            type="date"
            value={fechaRenovacion}
            onChange={(e) => setFechaRenovacion(e.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default Editar;
