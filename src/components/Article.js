import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import global from '../global'
import Sidebar from './sidebar'
import ImgDefault from '../assets/images/default.jpg'

import Moment from "react-moment"
import swal from "sweetalert"

export default class Article extends Component {

    url = global.url

    state = {
        article: {},
        status: ""
    }

    UNSAFE_componentWillMount() {
        var id = this.props.match.params.id
        this.getArticle(id)
    }

    getArticle = async (id) => {
        try {
            var res = await axios.get(this.url + "article/" + id)
            var article = res.data.article
            this.setState({
                article,
                status: "success"
            })
        } catch (e) {
            console.log("Mensaje: " + e)
            this.setState({ status: "error" })
        }
    }

    deleteArticle = (id) => {

        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado no podrás recuperar el artículo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

            .then(async (willDelete) => {
                if (willDelete) {

                    try {
                        var res = await axios.delete(this.url + "article/" + id)
                        this.setState({
                            article: res.data.article,
                            status: "deleted"
                        })

                        swal("El artículo ha sido eliminado correctamente", {
                            icon: "success",
                        });

                    } catch (e) {
                        console.log(e)
                    }

                    
                } else {
                    swal("El artículo no ha sido eliminado");
                }
            });

    }

    render() {
        var article = this.state.article
        var status = this.state.status
        //console.log(article)

        if (status === "deleted") {
            return <Redirect to="/blog" />
        }

        if (article && status === "success") {
            return (
                <div className="center">
                    <section id="content">

                        <article className="article-item article-detail">
                            <div className="img-wrap">
                                {
                                    article.image !== null ?
                                        <img src={this.url + "get-image/" + article.image} alt={article.title} /> :
                                        (<img src={ImgDefault} alt={article.title} />)
                                }
                            </div>
                            <h2 className="subheader">{article.title}</h2>
                            <span className="date">
                                <Moment fromNow locale="es">{article.date}</Moment>
                            </span>
                            <p>{article.content}</p>

                            <div style={{ marginLeft: "35%" }}>
                                <button to="#" className="btn btn-danger "
                                    onClick={
                                        () => {
                                            this.deleteArticle(article._id)
                                        }
                                    }
                                >Eliminar</button>
                                <Link to={"/blog/editar/"+article._id} className="btn btn-warning">Editar</Link>
                            </div>

                            <div className="clearflix"></div>

                        </article>


                    </section>

                    <Sidebar blog="true" />

                    <div className="clearflix"></div>

                </div>
            )
        } else if (status === "error") {
            return (
                <div className="center">
                    <section id="content">
                        <p>ID INVÁLIDO:</p>
                        <p>EL ARTÍCULO NO EXISTE</p>

                    </section>

                    <Sidebar blog="true" />

                    <div className="clearflix"></div>

                </div>
            )
        } else {
            return (
                <div className="center">
                    <section id="content">

                        <p>CARGANDO...</p>

                    </section>

                    <Sidebar blog="true" />

                    <div className="clearflix"></div>

                </div>
            )
        }
    }
}
