import React, { Component } from 'react'
import './Colors.css'
import axios from 'axios'

export default class Colors extends Component {
    state = {
        hexDigits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        colors: [],
        amount: 5,
    }
    randomColor = () => {
        return (`${[this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)],
        this.state.hexDigits[Math.floor(Math.random() * 15)]].join('')}`)
    }
    randomColors = async () => {
        let newColors = []
        if (this.state.colors.length === 0) {
            for (let i = 0; i < this.state.amount; i++) {
                console.log('help')
                let currentColor = this.randomColor()
                console.log(currentColor.toUpperCase())

                await axios.get(`https://www.thecolorapi.com/id?hex=${currentColor.toUpperCase()}`)
                    .then(res => {
                        newColors[i] = { color: currentColor, lock: false, name: res.data.name.value }
                    })
            }
        }
        else {
            for (let i = 0; i < this.state.amount; i++) {
                if (this.state.colors[i].lock === true) {
                    newColors[i] = this.state.colors[i]
                } else {
                    let currentColor = this.randomColor()
                    await axios.get(`https://www.thecolorapi.com/id?hex=${currentColor.toUpperCase()}`)
                        .then(res => {
                            newColors[i] = { color: currentColor, lock: false, name: res.data.name.value }
                        })
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
        var code = event.which
        if (code === 32) {
            this.randomColors()
        }
    }
    countPlus = async () => {
        if (this.state.amount <= 20) {
            let newArr = this.state.colors
            let newColor = this.randomColor()
            await axios.get(`https://www.thecolorapi.com/id?hex=${newColor.toUpperCase()}`)
                .then(res =>
                    newArr.push({ color: newColor, lock: false, name: res.data.name.value })
                )
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
        if (this.state.amount > 1) {
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
            <div key={i} className={`color${i + 1} color`} style={{ backgroundColor: `#${el.color}` }}>
                <div className="lock-container">
                    <p className="name">{el.name}</p>
                    <p className="hex">
                        {`#${el.color.toUpperCase()}`}
                    </p>
                    <div className="lock-button-container">
                        <div type="reset" className={`lock-button lock-${el.lock}`} onClick={e => this.colorLock(i)}>{el.lock === true ? 'UNLOCK' : 'LOCK'}</div>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="Colors" onKeyDown={e => this.spacePressed(e)} tabIndex="0">
                {colorMap}
                <div className="plus-minus">
                    <p>
                        Press space bar to randomize the colors. Press + or - to change the amount of colors.
                    </p>
                    <p className='amount'>
                        Current amount of colors: {this.state.amount}
                    </p>
                    <div className="button-container">
                        <div className='minus' onClick={this.countMinus}>-</div>
                        <div className='plus' onClick={this.countPlus}>+</div>
                    </div>
                </div>
            </div>
        )
    }
}