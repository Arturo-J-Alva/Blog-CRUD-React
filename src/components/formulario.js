import React, { Component } from 'react'
import Slider from './slider'
import Sidebar from './sidebar'

export default class blog extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    }

    recibirFormulario = (event) => {
        event.preventDefault()

        var genero = "sin-especificar"

        //console.log(this.generoHombreRef.current)

        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value
        } else if ((this.generoOtroRef.current.checked)) {
            genero = this.generoOtroRef.current.value
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }
        console.log(user)
        console.log("Formulario enviado")

        this.setState({
            user
        })

    }

    render() {

        if (this.state.user.nombre) {
            var user = this.state.user
        }

        return (
            <div id="formulario">
                <Slider
                    title="Formulario"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">

                        {/* Mostrar los datos del formulario */}

                        {
                            this.state.user.nombre
                            &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong> </p>
                                <p>Apellido: <strong>{user.apellidos}</strong> </p>
                                <p>Biografía: <strong>{user.bio}</strong> </p>
                                <p>Género: <strong>{user.genero}</strong> </p>
                            </div>
                        }

                        <h1 className="subheader">Formulario</h1>

                        {/* Crear un formulario */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" name="nombre" ref={this.apellidosRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografía</label>
                                <textarea name="bio" id="" ref={this.bioRef}></textarea>
                            </div>

                            <div className=" form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} />Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} />Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} />Otro

                            </div>
                            <div className="clearflix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>

                    </div>
                    <Sidebar blog="false" />
                </div>
            </div>
        )
    }
}
