import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import Global from '../global'
//import sidebar from "./sidebar"

import SimpleReactValidator from "simple-react-validator" /* validaciones para el formulario */
import swal from "sweetalert"

export default class CreateArticle extends Component {

    titleRef = React.createRef()
    contentRef = React.createRef()
    url = Global.url

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages:{
                required: "Este campo es requerido"
            }
        })


    }

    changeState = () => {
        this.setState(
            {
                article: {
                    title: this.titleRef.current.value,
                    content: this.contentRef.current.value
                }
            })
        //console.log(this.state)
        this.validator.showMessages()
        this.forceUpdate()
    }

    saveArticle = async (e) => {
        e.preventDefault()

        //Rellenar state con formulario
        this.changeState()

        //Hacer una peticion http por post para guardar el artículo
        if (this.validator.allValid()) {
            try {
                const res = await axios.post(this.url + "save", this.state.article)
                //console.log(res.data)
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting"
                    })

                    swal(
                        "Artículo creado",
                        "El artículo ah sido creado correctamente",
                        "success"
                    )

                    //Subir archivo
                    if (this.state.selectedFile !== null) {
                        //Scar el id del arículo guardado
                        var id = this.state.article._id

                        //crear form data y añadir fichero
                        const formData = new FormData();
                        formData.append(
                            "file0",
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        )
                        //petición ajax
                        try {
                            const res = await axios.post(this.url + "upload-image/" + id, formData)
                            if (res.data.article) {
                                this.setState({
                                    article: res.data.article,
                                    status: "success"
                                })
                            } else {
                                this.setState({
                                    article: res.data.article,
                                    status: "failed"
                                })
                            }
                        } catch (e) {
                            console.log(e)
                        }

                    } else { }


                } else {
                    this.setState({
                        status: "failed"
                    })
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            this.setState({
                status: "failed"
            })

            this.validator.showMessages()
            this.forceUpdate()
        }

    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    render() {

        if (this.state.status === "success") {
            return <Redirect to="/blog" />
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear artículo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            {/* nombre del campo-  estado del campo actual - Cadena de reglas */}
                            {this.validator.message("title", this.state.article.title, "required|alpha_num_space")}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} />

                            {this.validator.message("content", this.state.article.content, "required")}

                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Image</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
            </div>
        )
    }
}
