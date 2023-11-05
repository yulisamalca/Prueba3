import "./MainHeader.css";
import logo from "./../assets/images/logo.png"

function MainHeader() {
    return (
        <header id='main-header'>
            <div className="container">
                <img src={logo} alt="" id="logo"/>
            </div>
        </header>
    )
}

export default MainHeader