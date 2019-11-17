import React, { Component } from 'react'
import Slider from './slider'
import Sidebar from './sidebar'
import Articles from './Articles'

export default class home extends Component {
    render() {
        return (
            <div className="home">
                <Slider
                    title="Bienvenidos React Blog"
                    buttonString="Ir al Blog"
                    size="slider-big" />
                <div className="center">
                    <div id="content">
                        <h1>Últimos artículos</h1>
                        <Articles home="true"/>
                    </div>
                    <Sidebar />
                </div>
            </div>
        )
    }
}
