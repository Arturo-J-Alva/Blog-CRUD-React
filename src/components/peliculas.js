import React, { Component } from 'react'
import Pelicula from './pelicula'
//import MensajeEstatico from './MensajeEstatico'

import Sidebar from './sidebar'
import Slider from './slider'

export default class peliculas extends Component {

    state = {}
    /* INICIO DE FUNCIONES DE CICLO DE VIDA */
    UNSAFE_componentWillMount() {
        //alert("El componente Película se va montar")

        this.setState({
            peliculas: [
                { titulo: "Barman vs Superman", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHgNQEcz8rMTAv4UhKPIzJVmxFACsGQpEXQcvLWOwWsevpylid    " },
                { titulo: "Gran Torino", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy2m2XWfnmEF6y8IfX7S3uNFIY9VgV7YESbyxggFDRPACB884x" },
                { titulo: "Looper", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEWyO0OBsOWcIvI3ou0UCXrOGRI4fVIV_Fv3QYJcIodDzj-5ZR" }
            ],
            nombre: "Arturo J. Alva",
            pelicula_favorita: {}
        })
    }

    componentDidMount() {
        //alert("El componente Película se montó")
    }

    componentWillUnmount() {
        //alert("El componente se va desmontar")
    }

    /* INICIO DE FUNCIONES DE CICLO DE VIDA */

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() * 3)
        peliculas[0].titulo = "Batman Begins"

        this.setState({
            peliculas
        })
    }

    favorita = (event) => {

        this.setState({
            pelicula_favorita: event
        })

    }

    render() {

        var pStyle = {
            background: "green",
            color: "white"
        }

        /*  CONDICIONAL IF-ELSE (3er método) */
        var favorita

        if (this.state.pelicula_favorita.titulo) {
            favorita = (<div className="favorita" style={pStyle}>
                <p>La película favorita es: </p>
                <strong>{this.state.pelicula_favorita.titulo}</strong>
            </div>)
        } else {
            favorita = (
                <p>No hay película favorita</p>
            )
        }

        return (
            <React.Fragment>
                <Slider
                    title="Películas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader" >Listado de películas</h2>
                        <p>Selección de películas favortias de {this.state.nombre}</p>

                        <p><button onClick={this.cambiarTitulo}>Cambiar título de Batman</button></p>

                        {   /*  CONDICIONAL IF (1er método)*/
                            /* this.state.pelicula_favorita.titulo &&
                            <div className="favorita" style={pStyle}>
                                <p>La película favorita es: </p>
                                <strong>{this.state.pelicula_favorita.titulo}</strong>
                            </div> */

                            /*  CONDICIONAL IF-ELSE (2do método)*/
                            /* this.state.pelicula_favorita.titulo ? 
                            <div className="favorita" style={pStyle}>
                                <p>La película favorita es: </p>
                                <strong>{this.state.pelicula_favorita.titulo}</strong>
                            </div>
                            :
                            <p>No hay película favorita</p> */
                        }

                        {/* CONDICIONAL IF-ELSE (3er método) */}
                        {favorita}

                        {/* Crear componente Películas */}

                        {
                            this.state.peliculas.map((e, i) => {
                                return (
                                    <Pelicula pelicula={e} key={i} MarcarFavorita={this.favorita} />
                                )
                            })
                        }

                    </div>
                    <Sidebar blog="false" />
                </div>
            </React.Fragment>
        )
    }
}
