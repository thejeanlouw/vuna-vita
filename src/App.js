import logo from './logo.svg';
import Tabs from './components/tabs/tabs.component';
import './App.css';
import {Adsense} from '@ctrl/react-adsense';

function App() {
  return (
    <div className="App">
     {/* <SymptomInputForm /> */}
     <Tabs />
     <Adsense
      client="ca-pub-4276033322667538"
    />
    </div>
  );
}

export default App;
