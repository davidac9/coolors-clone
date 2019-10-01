import React, { Component } from 'react'
import './Colors.css'

export default class Colors extends Component {
    state = {
        hexDigits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        colors: [],
        amount: 5,
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
        let newColors = []
        for (let i = 0; i < this.state.amount; i++) {
            newColors[i] = {color:this.randomColor(), lock: false}
        }
        this.setState({
            colors: newColors
        })

    }
    colorLock = (colorIndex) => {
        let colorArr = this.state.colors
        colorArr[colorIndex].lock = !colorArr[colorIndex].lock
        this.setState({
            colors: colorArr
        })
    }
    spacePressed = (event) => {
        var code = event.keyCode
        if (code === 32) {
            this.randomColors()
        }
    }

    componentDidMount() {
        this.randomColors()
    }
    render() {
        const colorMap = this.state.colors.map((el, i) => (
            <div className={`color${i + 1}`} style={{ backgroundColor: `${this.state.colors[i].color}`}}>
                {this.state.colors[i].color.toUpperCase()}
                <button onClick={() => this.colorLock(i)}>lock</button>
            </div>
        ))
        return (
            <div className="Colors" onKeyDown={e => this.spacePressed(e)} tabIndex="0">
                {colorMap}
            </div>
        )
    }
}