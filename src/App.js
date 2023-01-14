import React from 'react';
import * as math from 'mathjs';
import './App.css';
import Wrapper from './Components/Wrapper';
import Button from './Components/Button';
import ButtonBox from './Components/ButtonBox';
import Screen from './Components/Screen';

const btn = [['AC','del','/','*'],
['7','8','9','-'],
['4','5','6','+'],
['1','2','3','='],
['0','.','+/-']];

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num : '',
            sign : '',
            result : '',
            toDisplay :'0',
        }
        this.pointHandler = this.pointHandler.bind(this);
        this.invertHandler = this.invertHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.delHandler = this.delHandler.bind(this);
        this.equalHandler = this.equalHandler.bind(this);
        this.signHandler = this.signHandler.bind(this);
        this.numHandler = this.numHandler.bind(this);
    }
    
    resetHandler() {
        this.setState({
            num : '',
            sign : '',
            result : '',
            toDisplay : '0',
        })
    }

    numHandler(event) {
        const value = event.target.innerHTML;
        let len = this.state.toDisplay.length;
        this.setState((prevState) => { return {
                toDisplay : prevState.toDisplay==='0'
                            ? value
                            : prevState.num==='0'
                            ? prevState.toDisplay.substr(0,len-1) + value
                            : (prevState.toDisplay + value),
                num : prevState.num==='0' ? value : (prevState.num + value),    
        }});                            
    }

    pointHandler(event) {
        const all = /([*]|[/]|[+]|[-])/g;
        const value = event.target.innerHTML;
        this.setState((prevState) => { return {
            toDisplay : prevState.num.indexOf('.') === -1
                        && prevState.result.indexOf('.') === -1
                        ? all.test(prevState.toDisplay[prevState.toDisplay.length-1])
                        ? (prevState.toDisplay + '0' + value)
                        : prevState.toDisplay + value
                        : prevState.toDisplay,
            num : prevState.num === '' && prevState.result === ''
                  ? '0' + value
                  : prevState.num === '' && prevState.result !== ''
                  ? prevState.result.indexOf('.') === -1
                  ? prevState.result + value
                  : prevState.num
                  : prevState.num.indexOf('.') === -1
                  ? prevState.num + value 
                  : prevState.num
        }})
    }

    signHandler(event) { 
        const value = event.target.innerHTML;
        const all = /([*]|[/]|[+]|[-]|[.])/g;
        const multiDiv = /([*]|[/])/g;
        this.setState((prevState) => { return {
            sign : value,
            toDisplay : prevState.toDisplay === '0' && value === '-'
                        ? value
                        : !all.test(prevState.toDisplay[prevState.toDisplay.length-1])
                          || (multiDiv.test(prevState.toDisplay[prevState.toDisplay.length-1]) && value ==='-')
                        ? (prevState.toDisplay + value)
                        : prevState.toDisplay,
            num : '',
            result : '',
        }})
    }

    equalHandler() {
        let toCal = this.state.toDisplay;
        let ans = math.evaluate(toCal);
        let roundedOff = math.format(ans, {precision : 10})
        this.setState({
            toDisplay : roundedOff.toString(),
            result : roundedOff.toString(),
            num : '',
        })
    }

    invertHandler() {
        const all = /([*]|[/]|[+]|[-])/g;
        const minus = /[-]/;
        this.setState((prevState) => { return {
            toDisplay : all.test(prevState.toDisplay) && !minus.test(prevState.toDisplay[0])
                        ? prevState.toDisplay 
                        : (Number(prevState.toDisplay) * -1).toString(),
        }})
    }

    delHandler() {
        let len = this.state.toDisplay.length;
        let len1 = this.state.num.length;
        let len2 = this.state.result.length;
        this.setState((prevState) => { return {
            toDisplay : len !== 1 ? prevState.toDisplay.substr(0,len-1) : '0',
            num : len1 !== 1 ? prevState.num.substr(0,len1-1) : '',
            result : len2 !== 1 ? prevState.result.substr(0,len2-1) : '0',
        }})
    }

    render() {
        console.log(this.state.num, this.state.toDisplay, this.state.result, this.state.sign);
        return (
            <div>
                <Wrapper>
                  <Screen display={this.state.toDisplay}/>
                  <ButtonBox>
                    {
                        btn.flat().map((e,i)=>{return (
                            <Button value={e} key={i} className={e==='='? 'eql' : e==='AC'? 'ac' : ''} 
                              onClick={
                                e==='.'? this.pointHandler :
                                e==='+/-'? this.invertHandler :
                                e==='AC'? this.resetHandler :
                                e==='del'? this.delHandler :
                                e==='='? this.equalHandler :
                                e==='+' || e==='-' || e==='*' || e==='/'? this.signHandler :
                                this.numHandler
                              }
                            />);
                        })
                    }
                  </ButtonBox> 
                </Wrapper>  
            </div>
        )
    }
}

export default App;