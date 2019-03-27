import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Container from '../Container/Container';
import ClickItem from '../ClickItem/ClickItem';
import data from '../../data.json';


class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.setState({ data: this.shuffleData(this.state.data) });
    }

    handleClick = this.handleClick.bind(this);

    handleClick(id) {
        const clickedIndex = this.state.data.findIndex((item) => item.id == id)
        const clickedItem = this.state.data[clickedIndex]
        if(clickedItem.clicked) {
            if(this.state.score > this.state.topScore) {
                this.setState({topScore: this.state.score});
            };
            this.setState({score: 0});
            const resetData = data.map(item => ({...item, clicked: false}));
            this.setState({data: this.shuffleData(resetData)});
            
        }else{
            clickedItem.clicked = true
            this.setState({
                score: this.state.score + 1,
                data: this.shuffleData(this.state.data)
            });
            
        }
        // this.setState({data})
    }

    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          i--;
        }
        return data;
    };

    render() {
        return (
            <div>
                <Header />
                <Nav
                    score={this.state.score}
                    topScore={this.state.topScore}
                />
                <Container>
                    {this.state.data.map(item => (
                        <ClickItem
                            handleClick={this.handleClick}
                            key={item.id}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
              
                </Container>
            </div>
        )
    }
}

export default Game;