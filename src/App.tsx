import logo from "./logo.svg";
import "./App.css";
import { StripeForm } from "./components/StripeForm";

const simulateFetch = async () => {
  return "seti_";
};

function App() {
  return (
    <div className="App">
      <StripeForm
        fetchSetupIntent={simulateFetch}
        handleException={(message) => console.error(message)}
        handleSuccess={(response) => {
          console.log({ response });
        }}
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
