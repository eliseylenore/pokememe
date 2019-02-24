import React, { Component } from 'react';
import './App.css';

class MemeGenerator extends Component {
    constructor() {
        super();

        this.state = {
            topText: "",
            bottomText: "",
            url: "",
            allMemes: "", 
            memeIsShowing: false
        }
    }

    generateImage(event) {
        event.preventDefault();
        fetch("http://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 91))
            .then(res => res.json())
            .then(
                (result) => {console.log(result)
                    this.setState({
                        isLoaded: true,
                        url: result.sprites.front_default, 
                        memeIsShowing: true
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     this.setState({
                //         isLoaded: true,
                //         error
                //     });
                // }
            )
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    meme() {
        if (this.state.memeIsShowing) {
            console.log("IS SHOWING!")
            return (
                <div style={{position: "relative"}}>
                    <img className="meme-img" src={this.state.url} />
                    <h1 className="top-text">{this.state.topText}</h1>
                    <h1 className="bottom-text">{this.state.bottomText}</h1>
                </div>
            )
        }
    }

    render () {
        return (
            <div className="meme-generator">
                <form onSubmit={this.generateImage.bind(this)}>    
                    <label>
                        Top text
                    <input
                            name="topText"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <label>
                        Bottom text
                    <input
                            name="bottomText"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <button>Generate Meme</button>
                    {this.meme()}
                </form>
            </div>
        )
    }
}

export default MemeGenerator