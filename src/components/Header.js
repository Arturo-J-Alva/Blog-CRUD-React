import React, { Component } from 'react'
import logo from '../assets/images/logo.svg'
import {NavLink} from "react-router-dom"

/* El Header.js tiene que estar dentro del rutes.js para que los LINKS puedan funcionar */

export default class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">

                    {/* Logo */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo" />
                            <span id="brand">
                                <strong>React</strong>Blog
                            </span>
                    </div>

                        {/* Menú */}
                        <nav id="menu">
                            <ul>
                                <li><NavLink to="/home" activeClassName="active" >Inicio</NavLink></li>
                                <li><NavLink to="/blog" >Blog</NavLink></li>
                                <li><NavLink to="/formulario" >Formulario</NavLink></li>
                                <li><NavLink to="/peliculas" >Películas</NavLink></li>
                                <li><NavLink to="/pruebas/:arturoJ" >PáginaP</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                     {/* Limpiar flotados */} 
        <div className="clearflix"></div>
    </header>
                )
            }
        }
