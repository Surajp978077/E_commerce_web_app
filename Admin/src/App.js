import logo from './logo.svg';
import './App.css';
// import TokenHandler from './Components/TokenHandler';
import Menu from './Components/Menu';

function App() {
  return (
    <>
      <Menu />
      {/* <TokenHandler /> */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
