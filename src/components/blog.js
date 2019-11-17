import React, { Component } from 'react'

import Slider from './slider'
import Sidebar from './sidebar'
import Articles from './Articles'

export default class blog extends Component {

    render() {

        

        return (
            <div className="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículo del API REST */}

                        <Articles/>
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        )
    }
}
