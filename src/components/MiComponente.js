import React, { Component } from 'react'

export default class MiComponente extends Component {

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ["Tomate","Queso","Jamon cocido"],
            calorias: 400
        }

        return (
            {/* <React.Fragment>
                <div>Holi, soy el componete llamdo el Micomponente</div>
                <div>Estoy probando el código</div>
            </React.Fragment> */},
            <div className="mi-compontente">
                <h1>{"Receta: "+receta.nombre}</h1>
                <h2>{"Calorías:"+receta.calorias}</h2>

                <ol>
                {
                    receta.ingredientes.map((ingrediente,i) => {
                       return <li key={i}>{ingrediente}</li>
                    })
                }
                </ol>
                <hr/>
                <h3>{this.props.saludo}</h3>
            </div>
        )
    }
}
