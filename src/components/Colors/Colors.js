import React, { Component } from 'react'
import './Colors.css'

export default class Colors extends Component {
    state = {
        hexDigits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        colors: [],
        amount: 1,
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
        if (this.state.colors.length === 0) {
            for (let i = 0; i < this.state.amount; i++) {
                newColors[i] = { color: this.randomColor(), lock: false }
            }
        }
        else {
            for (let i = 0; i < this.state.amount; i++) {
                if (this.state.colors[i].lock === true) {
                    newColors[i] = this.state.colors[i]
                } else {
                    newColors[i] = { color: this.randomColor(), lock: false }
                }
            }
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
    countPlus = () => {
        if (this.state.amount <= 20) {
            let newArr = this.state.colors
            newArr.push({color: this.randomColor(), lock: false})
            this.setState({
                amount: this.state.amount + 1,
                colors: newArr
            })
        }
        else {
            alert(`you don't need that many colors`)
        }
    }
    countMinus = () => {
        console.log(`first boing`)
        if (this.state.amount > 1) {
            console.log('boing')
            let newArr = this.state.colors
            newArr.pop()
            this.setState({
                amount: this.state.amount - 1,
                colors: newArr
            })
        }
        else {
            alert(`you can't have less than one color`)
        }
    }
    componentDidMount() {
        this.randomColors()
    }
    render() {
        const colorMap = this.state.colors.map((el, i) => (
            <div key={i} className={`color${i + 1}`} style={{ backgroundColor: `${this.state.colors[i].color}` }}>
                {this.state.colors[i].color.toUpperCase()}
                <button onClick={() => this.colorLock(i)}>lock</button>
            </div>
        ))
        return (
            <div className="Colors" onKeyDown={e => this.spacePressed(e)} tabIndex="0">
                {colorMap}
                <div>
                {this.state.amount}
                <button onClick={this.countPlus}>+</button>
                <button onClick={this.countMinus}>-</button>
                </div>
            </div>
        )
    }
}