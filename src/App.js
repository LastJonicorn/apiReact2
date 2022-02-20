import './App.css';
import { useState } from 'react';

let URL = "http://api.exchangeratesapi.io/v1/latest?access_key=";
let API_KEY = "922d604979df05c31e13247f34951daa";

function App() {
  let [eur,setEur] = useState(0);
  let [gbp,setGbp] = useState(0);
  let [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      let address = URL + API_KEY;
      let response =await fetch(address);

      if (response.ok) {
        let json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert ("Error retrieving exchange rate.");
        console.log(response);
      }
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div id='conatiner'>
      <form onSubmit={convert}>
        <div>
          <h2>Change euro to GBP</h2>
          <label>Eur</label>&nbsp;
          <input type="number" step="0.01"
          value={eur} onChange={e => setEur(e.target.value)}/>
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>
          <output>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
