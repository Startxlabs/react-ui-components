import logo from "./logo.svg";
import "./App.css";
import { StripeForm } from "./components/StripeForm";

const simulateFetch = async () => {
  return "seti_";
};

function App() {
  return (
    <div className="App">
      <div style={{ width: 300 }}>
        <StripeForm
          fetchSetupIntent={simulateFetch}
          handleException={(message) => console.error(message)}
          handleSuccess={(response) => {
            console.log({ response });
          }}
          style={{
            base: {
              fontSize: "0.88rem",
              padding: "13px 22px",
              color: "#1b3e87",
              letterSpacing: "0.025em",
              fontWeight: 400,
              lineHeight: "45px",
              backgroundColor: "#f5f5f5",

              "::placeholder": {
                color: "#1b3e87",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: "0.88rem",
              },
            },
            invalid: {
              color: "#F53997",
            },
          }}
        />
      </div>
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
