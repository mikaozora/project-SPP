import React from "react"
import { Link } from "react-router-dom"
class navbar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render() {
        return (
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand">
                    BAYAR SPP!!
                </a>
                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Beranda
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pembayaran" className="nav-link">
                                Pembayaran
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default navbar;