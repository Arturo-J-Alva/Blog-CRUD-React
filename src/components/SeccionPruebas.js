import React, { Component } from 'react'

import MiComponente from './MiComponente'

export default class SeccionPruebas extends Component {

    state = {
        contador: 0
    }

    HolaMundo(nombre, edad) {
        var presentacion =
            (<div>
                <h2>Hola soy {nombre}</h2>
                <h3>Tengo {edad} años</h3>
            </div>)

        return presentacion;
    }
    /* Estas 2 funciones necesitan el bind(this) para poder usarlas, , ejm onClick={this.sumar.bind(this)} */
    /* sumar(){
        //this.contador++
        this.setState({
            contador: (this.state.contador+1)
        })
    }

    restar(){
        //this.contador--
        this.setState({
            contador: (this.state.contador-1)
        })
    } */

    /* Si lo definimos con el método flecha ya no necesitaremos del bind(this) */
    
    sumar= () => {
        //this.contador++
        this.setState({
            contador: (this.state.contador+1)
        })
    }

    restar= () => {
        //this.contador--
        this.setState({
            contador: (this.state.contador-1)
        })
    }

    render() {

        const nombre = "Arturo J. Alva"

        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p>
                    Holi mundi
                </p>

                <h2 className="subheader">Funciones y JSX básico</h2>

                <div>{this.HolaMundo(nombre, 26)}</div>

                <h2 className="subheader">Componentes</h2>

                <section classNameName="componentes">
                    <MiComponente />
                    

                </section>

                <h2 className="subheader">Estado</h2>

                <p>Contador: {this.state.contador}</p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar}/>
                    <input type="button" value="Restar" onClick={this.restar}/>
                </p>


            </section>
        )
    }
}
