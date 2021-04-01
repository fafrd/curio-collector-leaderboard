import './App.css';
import Cards from './Cards.js'

function App() {
  var exampleHoldings = {
    "data": {
      "cardHolders": [
        {
          "holdings": [
            {
              "balance": "1",
              "cardNumber": "10"
            },
            {
              "balance": "1",
              "cardNumber": "11"
            },
            {
              "balance": "1",
              "cardNumber": "12"
            },
            {
              "balance": "3",
              "cardNumber": "13"
            },
            {
              "balance": "31",
              "cardNumber": "14"
            },
            {
              "balance": "1",
              "cardNumber": "15"
            },
            {
              "balance": "13",
              "cardNumber": "17"
            },
            {
              "balance": "3",
              "cardNumber": "18"
            },
            {
              "balance": "1",
              "cardNumber": "19"
            },
            {
              "balance": "0",
              "cardNumber": "2"
            },
            {
              "balance": "1",
              "cardNumber": "20"
            },
            {
              "balance": "4",
              "cardNumber": "21"
            },
            {
              "balance": "1",
              "cardNumber": "22"
            },
            {
              "balance": "1",
              "cardNumber": "23"
            },
            {
              "balance": "1",
              "cardNumber": "24"
            },
            {
              "balance": "1",
              "cardNumber": "25"
            },
            {
              "balance": "1",
              "cardNumber": "26"
            },
            {
              "balance": "64",
              "cardNumber": "27"
            },
            {
              "balance": "1",
              "cardNumber": "28"
            },
            {
              "balance": "1",
              "cardNumber": "3"
            },
            {
              "balance": "32",
              "cardNumber": "30"
            },
            {
              "balance": "1",
              "cardNumber": "4"
            },
            {
              "balance": "1",
              "cardNumber": "5"
            },
            {
              "balance": "7",
              "cardNumber": "6"
            },
            {
              "balance": "75",
              "cardNumber": "7"
            },
            {
              "balance": "1",
              "cardNumber": "8"
            },
            {
              "balance": "420",
              "cardNumber": "9"
            }
          ],
          "id": "0x97575aac6912233403e9b8935e980dec40c55548"
        }
      ]
    }
  };

  return (
    <div className="app">
      <section>
        <header>30 cards</header>
        <p>0x123...456</p>
        <p>0x123...456</p>
        <p>0x123...456</p>
      </section>

      <aside>

        <Cards holdings={exampleHoldings}/>

      </aside>


    </div>
  );
}

export default App;
