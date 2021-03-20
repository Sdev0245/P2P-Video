import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import Player from './components/player/player'
import './App.css';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Player/>
      </div>
    </BrowserRouter>
  );
}

export default App;
