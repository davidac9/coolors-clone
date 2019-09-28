import React, { Component } from 'react'
import './Colors.css'

export default class Colors extends Component {
    state = {
        hexDigits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        colors: []
    }
    randomColor = () => {
        return (`#${[this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)]].join('')}`)
    }
    randomColors = () => {
        this.setState({
            colors: [
                this.randomColor(),
                this.randomColor(),
                this.randomColor(),
                this.randomColor(),
                this.randomColor()
            ]
        })
    }
    componentDidMount() {
        this.randomColors()
    }
    render() {
        return (
            <div className="Colors">
                <div className="color-1"
                    style={{ backgroundColor: `${this.state.colors[0]}` }}
                >color1</div>
                <div className="color-2"
                    style={{ backgroundColor: `${this.state.colors[1]}` }}
                >color2</div>
                <div className="color-3"
                    style={{ backgroundColor: `${this.state.colors[2]}` }}
                >color3</div>
                <div className="color-4"
                    style={{ backgroundColor: `${this.state.colors[3]}` }}
                >color4</div>
                <div className="color-5"
                    style={{ backgroundColor: `${this.state.colors[4]}` }}
                >color5</div>
            </div>
        )
    }
}