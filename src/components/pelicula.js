import React, { Component } from 'react'
import {Link} from "react-router-dom"
export default class pelicula extends Component {

    marcar = () => {
        this.props.MarcarFavorita(this.props.pelicula )
    }

    render() {
        
         
        const {titulo,image} = this.props.pelicula 

        return (
            <article className="article-item" id="item-template">
                <div className="img-wrap"><img src={image} alt={titulo} /></div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                                    </span>
                <Link to="/blog">Leer más</Link>
                <button onClick={this.marcar}>
                    Marcar como favorita
                </button>

                <div className="clearflix"></div>

            </article>
        )
    }
}
