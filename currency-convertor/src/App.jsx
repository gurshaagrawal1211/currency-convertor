import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] = useState(0)
  const [convertedAmt, setConvertedAmt] = useState(0)
  const [from, setFrom] = useState("inr")
  const [to, setTo] = useState("usd")

  const currencyInfo=useCurrencyInfo(from)

  const options=Object.keys(currencyInfo)

  const convert=()=>{
    setConvertedAmt(amount * currencyInfo[to])
  }

  const swap=()=>{
    setFrom(to)
    setTo(from)
    setAmount(convertedAmt)
    setConvertedAmt(amount)
  }

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e)=>{
                e.preventDefault()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount > 0 ? amount : 0}
                  onAmountChange={(amount)=>setAmount(amount)}
                  onCurrencyChange={(from)=>setFrom(from)}
                  currencyOptions={options}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md text-white px-2 py-0.5 bg-amber-700"
                  onClick={swap}
                >
                    swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmt > 0 ? convertedAmt : 0}
                  currencyOptions={options}
                  onCurrencyChange={(to)=>setTo(to)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type="submit" className="w-full bg-amber-700 text-white px-4 py-3 rounded-lg"
                onClick={convert}>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
