import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"
import axios from 'axios'
import Global from '../global'
import ImgDefault from '../assets/images/default.jpg'
//import sidebar from "./sidebar"

import SimpleReactValidator from "simple-react-validator" /* validaciones para el formulario */
import swal from "sweetalert"

//1.Recoger el id del artículo a editar de la url
//2. Crear un método para sacar ese objeto del backend
//3. Reprobar / rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo una petición al backend

export default class editArticle extends Component {

    titleRef = React.createRef()
    contentRef = React.createRef()
    url = Global.url

    state = {
        article: {},
        status: null,
        selectedFile: null,
        selectedId: null
    }

    UNSAFE_componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido"
            },
            locale: "es"
        })

        var id = this.props.match.params.id
        this.setState({
            selectedId: id
        })
        this.getArticle(id)


    }

    getArticle = async (id) => {
        try {
            var res = await axios.get(this.url + "article/" + id)
            var article = res.data.article
            this.setState({
                article
            })
        } catch (e) {
            console.log("Mensaje: " + e)
            this.setState({ status: "error" })
        }
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

    updateArticle = async (e) => {
        e.preventDefault()

        //Rellenar state con formulario
        this.changeState()

        //Hacer una pericion http por post para guardar el artículo
        if (this.validator.allValid()) {
            try {
                const res = await axios.put(this.url + "article/" + this.state.selectedId, this.state.article)
                //console.log(res.data)
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting"
                    })

                    swal(
                        "Artículo actualizado",
                        "El artículo ah sido actualizado correctamente",
                        "success"
                    )

                    //Subir archivo
                    if (this.state.selectedFile !== null) {
                        //Sacar el id del arículo guardado
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

                    } else {
                        this.setState({
                            status: "success"
                        })
                    }


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
                    <h1 className="subheader">Editar artículo</h1>

                    <form className="mid-form" onSubmit={this.updateArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} defaultValue={this.state.article.title} />
                            {/* nombre del campo-  estado del campo actual - Cadena de reglas */}
                            {this.validator.message("title", this.state.article.title, "required|alpha_num_space")}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} value={this.state.article.content} />

                            {this.validator.message("content", this.state.article.content, "required")}

                        </div>

                        <div className="img-wrap">
                                {
                                    this.state.article.image !== null ?
                                        <img src={this.url + "get-image/" + this.state.article.image} alt={this.state.article.title} style={{ width: "75%" }}/> :
                                        (<img src={ImgDefault} alt={this.state.article.title} />)
                                }
                            </div>

                        <div className="form-group">
                            <label htmlFor="file0">Image</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Editar" className="btn btn-success" />
                        <Link to={"/blog/articulo/" + this.state.selectedId} className="btn btn-warning">Cancelar</Link>

                    </form>

                </section>



            </div>
        )
    }
}
