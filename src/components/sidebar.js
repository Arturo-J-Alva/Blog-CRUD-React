import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"

export default class sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false  
    }
    
    redirectToSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        })
    }
    
    render() {
        if(this.state.redirect === true){
            return <Redirect  to={"/redirect/"+this.state.search}/>
        }
        return (
            <div>
                <aside id="sidebar">
                    {this.props.blog === "true"
                        &&
                        <div id="nav-blog" className="sidebar-item">
                            <h3>Puedes hacer esto</h3>
                            <Link to="/blog/crear" className="btn btn-success">Crear Artículo</Link>
                        </div>
                    }
                    <div id="buscador" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form onSubmit={this.redirectToSearch}>
                            <input type="text" name="search" ref={this.searchRef}/>
                            <input type="submit" name="submit" value="Buscar" className="btn btn-success" />
                        </form>
                    </div>
                </aside>
            </div>
        )
    }
}
