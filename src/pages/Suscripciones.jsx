import { useEffect, useState } from "react";
import { eliminarElemento } from "../helpers/funciones";
import "./Home.css"

function Suscripciones (){
    const [suscripciones, setSuscripciones] = useState([]);
    let apiUsuarios = "http://localhost:4000/usuarios";
  const getSuscripciones = () => {
    fetch(apiUsuarios)
      .then((res) => res.json())
      .then((data) => setSuscripciones(data));
  
    function confirmacion(id){
        eliminarElemento (
            "¿Esta seguro?","esta accion no se puede desacer","warning"
        ).then((result) => {
      if (result.isConfirmed) {
        fetch(`apiUsuarios${id}`, {
          method: "DELETE",
        }).then(() => {
          getSuscripciones();
          Swal.fire("Eliminado", "Suscripción eliminada", "success");
        });
      }
    });
  
    
    }


    useEffect(() => {
    getSuscripciones();
  }, []);
    return(
        <div className="lista">
      <h2 className="titulo_suscripciones" >Suscripciones registradas</h2>
      {suscripciones.map((sus) => (
        <div key={sus.id} className="card">
          <h3>{sus.nombre}</h3>
          <p>Categoría: {sus.categoria}</p>
          <p>Costo: ${sus.costo}</p>
          <p>Renovación: {sus.fecha}</p>
          <button onClick={() => confirmacion(sus.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
}
export default Suscripciones;
