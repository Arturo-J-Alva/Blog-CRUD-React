import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

//importar componentes
//import SeccionPruebas from './components/SeccionPruebas'
import MiComponente from './components/MiComponente'
import Error from './components/error'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/home'
import Blog from './components/blog'
import Peliculas from './components/peliculas'
import Formulario from './components/formulario'
import Search from './components/Search'
import Article from './components/Article'
import CreateArticle from './components/CreateArticle'
import editArticle from './components/editArticle'

export default class routes extends Component {
    render() {
        return (
            {/* Configurar Rutas y páginas */ },
            <BrowserRouter>

                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={editArticle} />
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search
                            return (
                                <Redirect to={"/blog/busqueda/" + search} />
                            )
                        }
                    } />

                    <Route exact path="/peliculas" component={Peliculas} />
                    <Route exact path="/formulario" component={Formulario} />

                    <Route exact path="/pagina-1" render={() => (
                        <React.Fragment>
                            <h1>Hola mundo desde el la ruta: página-1</h1>
                            <MiComponente saludo="Hola humano desde el props saludo" />
                        </React.Fragment>
                    )} />

                    <Route exact path="/pruebas/:nombre/:apellido?" render={(props) => { /* parametro "apellidos" es opcional */

                        var nombre = props.match.params.nombre
                        var apellido = props.match.params.apellido

                        return (
                            <div id="content">
                                <h1 className="subheader">Página de pruebas</h1>
                                {nombre && !apellido &&
                                    <p>Nombre: {nombre}</p>
                                }
                                {nombre && apellido &&
                                    <React.Fragment>
                                        <p>Nombre: {nombre}</p>
                                        <p>Apellido: {apellido}</p>
                                    </React.Fragment>}
                            </div>
                        )
                    }} />

                    <Route component={Error} />  {/* Error 404 personalizado*/}
                </Switch>

                <div className="clearflix"></div>
                <Footer />
            </BrowserRouter>
        )
    }
}
