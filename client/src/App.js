import React, {Component} from 'react';
import './App.css';
import threeEntryPoint from "./components/threejs/threeEntryPoint"


/**
 * https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0
 *
 * https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f
 *
 * 
 */
class App extends Component {

    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }


    render() {
        return (
            <div>
                <div className="App" ref={element => this.threeRootElement = element}></div>
            </div>
        );
    }
}


export default App;
