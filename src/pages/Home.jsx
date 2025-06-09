import Contenido from "../components/Contenido"
import MenuLateral from "../components/MenuLateral"
import "./Home.css"
function Home (){
    return(
    <div className="home_informacion">
        <MenuLateral/>
        <section>
        <div>
            <Contenido/>
        </div>
        </section>
    </div>
    )
}
export default Home