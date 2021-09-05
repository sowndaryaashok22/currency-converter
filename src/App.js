import Currency from './Components/Currency';
import './App.css'
import { useEffect ,useState} from 'react';

const url ='http://api.exchangeratesapi.io/v1/latest?access_key=edcd9f582ba65d8b447ba7aec75a1c97'
function App() {

  const [currencyList, setCurrencyList] =useState([])
  const [fromCurrencyList, setFromCurrencyList] = useState()
  const [toCurrencyList, setToCurrencyList] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFromInCurrency, setAmountFromInCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()

  let toAmount , fromAmount
  if(amountFromInCurrency)
  {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else
  {
    toAmount = amount;
    fromAmount = amount/ exchangeRate
  }

 useEffect(async ()=>{
  const fetchData =   await fetch(url)
  const result = await fetchData.json();
  //console.log('result is',result )

  const baseCurrency = result.base;
  //console.log(baseCurrency)
  const otherCurrencies = Object.keys(result.rates)
  const firstCurrency =Object.keys(result.rates)[1]

  setCurrencyList([baseCurrency, ...otherCurrencies])
  setFromCurrencyList(result.base);
  setToCurrencyList(firstCurrency)
  setExchangeRate(result.rates[firstCurrency])


 } ,[])

 useEffect(async() =>{

  console.log(' from/to data changed')
  if(fromCurrencyList && toCurrencyList) {

    let url1 = `${url}&base=${fromCurrencyList}&symbols=${toCurrencyList}`;
    console.log('url', url1)
    const fetchData =   await fetch(`${url}&base=${fromCurrencyList}&symbols=${toCurrencyList}`)
    const result = await fetchData.json();
    console.log('result ', result)
    setExchangeRate(result.rates[toCurrencyList])

  }


 },[fromCurrencyList, toCurrencyList])


//  console.log(currencyList)

 console.log(fromCurrencyList );
 console.log(toCurrencyList)
 console.log(exchangeRate)

 const handleFromAmountChange = (e) => {
  console.log('from amount change')
    setAmount(e.target.value);
    setAmountFromInCurrency(true);
 }
 const handleToAmountChange = (e) => {
 
  setAmount(e.target.value);
  setAmountFromInCurrency(false);
}

  return (
    <div className="App">
      <h1>Currency Convertor</h1>
      <Currency 
        currencyList={currencyList}
        selectedCurrency={fromCurrencyList}
        onChangeCurrency= {e => setFromCurrencyList(e.target.value)}
        amount = {fromAmount}
        handleOnChangeAmount={handleFromAmountChange}/>
      <div className='equals'>=</div>
      <Currency
        currencyList={currencyList}
        selectedCurrency={toCurrencyList}
        onChangeCurrency= {e => setToCurrencyList(e.target.value)}
        amount= {toAmount}
        handleOnChangeAmount={handleToAmountChange}
        />
    </div>
  );
}

export default App;
