import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
/* npm i moment react-moment */
import Moment from "react-moment"
import "moment/locale/es" /* Moment en español */

import Global from '../global'
import ImgDefault from '../assets/images/default.jpg'


export default class Articles extends Component {

    url = Global.url

    state = {
        articles: [],
        status: null
    }

    UNSAFE_componentWillMount() {

        var home = this.props.home
        var search = this.props.search
        if(home === "true"){
            this.getLastArticles()
        }else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search)
        }else{
            this.getArticles()
        }
        
    }

    getLastArticles = async () => {
        var res = await axios.get(this.url+"articles/5")

        var articles = res.data.articles
        this.setState({
            articles,
            status: "success"
        })

    }
 
    getArticles = async () => {
        var res = await axios.get(this.url+"articles")

        var articles = res.data.articles
        this.setState({
            articles,
            status: "success"
        })

    }

    getArticlesBySearch = async (searched) => {
        try{
            var res = await axios.get(this.url+"search/"+searched)

        var articles = res.data.articles
        
        if(articles){
            this.setState({
                articles,
                status: "success"
            })
        }

        }catch(e){
            this.setState({
                status: "failed"
            })
            console.log(e.response)
        }
    }

    render() {
        if (this.state.articles.length >= 1) {
           var listArticles = this.state.articles.map(e => {
               return (
                <article className="article-item" id="item-template" key={e._id}>
                <div className="img-wrap">
                    {
                        e.image !== null ?
                        <img src={this.url+"get-image/"+e.image} alt={e.title}/> :
                        (<img src={ImgDefault} alt={e.title}/>)
                    }
                </div>
                <h2>{e.title}</h2>
                <span className="date">
                    <Moment fromNow locale="es">{e.date}</Moment>
                </span>
                <Link to={"/blog/articulo/"+e._id}>Leer más</Link>

                <div className="clearflix"></div> 

            </article>
               )
           })
           return(
               <div id="articles">
                   {listArticles}
               </div>
           )
        } else if (this.state.articles.length === 0 && this.state.status === "success") {
            return (
                <div id="content">
                    <h3 className="subheader">NO HAY ARTÍCULOS PARA MOSTRAR</h3>
                </div>
            )
        }else if(this.state.articles.length === 0 && this.state.status === "failed"){
            return (
                <div id="content">
                    <h3 className="subheader">No hay artículos que coincidan con tu búsqueda</h3>
                </div>
            )
        }
         else {
            return (
                <div id="content">
                    <h3 className="subheader">CARGANDO...</h3>
                </div>
            )
        }
    }
}
