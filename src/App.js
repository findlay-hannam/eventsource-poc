import { SSE } from 'sse.js';
import logo from './logo.svg';
import './App.css';

function sendRequest() {
  const source = new SSE('https://staging.mendeley.com/query-intent',
  // const source = new SSE('https://localhost.mendeley.com:3000/query-intent',
    {
      payload: JSON.stringify({
        searchQuery: 'data',
        pageNumber: 1,
        facets: {
          facets: {
            authorFullName: [{
              label: "Bertil Halle",
              name: "Bertil Halle",
              isApplied: true,
            }],
          },
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      skipDefaultHeaders: true,
    },
  );
  source.addEventListener('open', () => {
    console.log('Connected');
  });
  source.addEventListener('message', (e) => {
    console.log('Message', JSON.parse(e.data));
  });
  source.addEventListener('error', (err) => {
    console.error(err);
    source.close();
  });
  source.stream();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={sendRequest}>Send request</button>
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
  );
}

export default App;
