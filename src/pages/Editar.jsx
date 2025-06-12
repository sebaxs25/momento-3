import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { guardarCambios } from "../helpers/funciones";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    costo: "",
    categoria: "",
    fechaRenovacion: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://localhost:4000/suscripciones";
  const categorias = ["Películas", "Series", "Música", "Juegos", "Software", "Otros"];

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        setFormData({
          nombre: data.nombre || "",
          costo: data.costo || "",
          categoria: data.categoria || "",
          fechaRenovacion: data.fechaRenovacion || ""
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [id]);

  // Actualiza campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      // Alerta y redirección
      await Swal.fire({
        title: "¡Actualizado!",
        text: "Los cambios se guardaron correctamente.",
        icon: "success",
        confirmButtonColor: "#3182ce"
      });

      navigate("/suscripciones");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  
  return (
    <div className="editar-container">
      <form className="editar-form" onSubmit={handleSubmit}>
        <h2>Editar Suscripción</h2>
        
        <div className="input-group">
          <label htmlFor="nombre">Nombre del servicio</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            minLength="3"
          />
        </div>

        <div className="input-group">
          <label htmlFor="costo">Costo mensual</label>
          <input
            id="costo"
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="input-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="fechaRenovacion">Fecha de renovación</label>
          <input
            id="fechaRenovacion"
            type="date"
            name="fechaRenovacion"
            value={formData.fechaRenovacion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}
export default Editar;
