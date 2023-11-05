import { Link, useLocation } from "react-router-dom"
import { navlist } from "../data/MainNavData"

function MainNav() {
    const rutaPagina = useLocation().pathname // captura la url
    console.log(rutaPagina)
    return (       
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Ideas Digitales</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#nosotros">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#noticias">Noticias</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#historia">Historia</a>
                        </li> */}
                        {
                            navlist.map((item,index) =>
                                <li key={index} className="nav-item">
                                    <Link className={rutaPagina === item.path ? "nav-link active" : "nav-link" } to={item.path}>{item.text}</Link>
                                </li>        
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default MainNav