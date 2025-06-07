import { Outlet } from "react-router-dom"
function Contenido (){
    return(
        <section className="contenido_aplicacion">
            <Outlet/>
        </section>
    )

}
export default Contenido