import React, { Component } from 'react'

import Slider from './slider'
import Sidebar from './sidebar'
import Articles from './Articles'

export default class Search extends Component {

    render() {
    //Obtner el parametro "search" de la URL
    var searched = this.props.match.params.search         

        return (
            <div className="blog">
                <Slider
                    title={"Busqueda: "+searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículo del API REST */}

                        <Articles search={searched}/>
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        )
    }
}
