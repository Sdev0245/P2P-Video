import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import Player from './components/player/player'
import {classes} from './App.module.css'

function App() {
  return (

    <BrowserRouter>
        <div>
          <Player/>
        </div>
    </BrowserRouter>
  );
}

export default App;
