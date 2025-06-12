import { useEffect, useState } from "react";
import { eliminarElemento } from "../helpers/funciones";
import { Link } from "react-router-dom";
import "./Home.css"

function Suscripciones() {
  const [suscripciones, setSuscripciones] = useState([]);
  const [loading, setLoading] = useState(true);


  const apiUrl = "http://localhost:4000/suscripciones";

  // Cargar datos iniciales
  useEffect(() => {
    let isMounted = true;

 
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (isMounted) setSuscripciones(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
 }, []);
  // Función para mostrar errores
  const mostrarError = (mensaje) => {
    Swal.fire({
      title: "Error",
      text: mensaje,
      icon: "error",
      confirmButtonColor: "#3182ce"
    });
  }

  // Confirmación de eliminación (similar a tu TarjetaJuego)
  const confirmarEliminacion = async (id, titulo) => {
  try {
    const result = await eliminarElemento(
      "¿Eliminar suscripción?",
      `Esta acción eliminará "${titulo}" permanentemente.`,
      "warning"
    );

    if (result.isConfirmed) {
      setLoading(true);
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      // ✅ Aquí actualizas la lista sin volver a cargar todo
      setSuscripciones(prev => prev.filter(sus => sus.id !== id));

      await Swal.fire("Éxito", "Suscripción eliminada correctamente", "success");
    }
  } catch (error) {
    console.error("Error eliminando:", error);
    await Swal.fire("Error", error.message || "No se pudo eliminar", "error");
  } finally {
    setLoading(false);
  }
};
  

  // Mostrar mensaje de éxito...


  return (
    <div className="gestion-suscripciones">
      <header className="gestion-header">
        <h1>Suscripciones Registradas</h1>
        <Link to="registrar" className="btn-primary">
          Agregar Suscripción
        </Link>
      </header>

      {suscripciones.length === 0 ? (
        <div className="no-suscripciones">
          <p>No tienes suscripciones registradas</p>
          <Link to="registrar" className="btn-primary">
            Crear primera suscripción
          </Link>
        </div>
      ) : (
        <div className="suscripciones-grid">
          {suscripciones.map((sus) => (
            <div key={sus.id} className="suscripcion-card">
              <div className="card-header">
                <h2>{sus.nombre}</h2>
                <span className={`categoria ${sus.categoria.toLowerCase()}`}>
                  {sus.categoria}
                </span>
              </div>

              <div className="card-body">
                <p><strong>Costo:</strong> ${sus.costo}</p>
                <p><strong>Renovación:</strong> {new Date(sus.fecha).toLocaleDateString()}</p>
              </div>

              <div className="card-actions">
                <button
                  onClick={() => confirmarEliminacion(sus.id)}
                  className="btn-danger"
                >
                  Eliminar
                </button>
                <Link to={`editar/${sus.id}`} className="btn-secondary">
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Suscripciones;
