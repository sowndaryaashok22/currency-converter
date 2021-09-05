import React from 'react'

const Currency = ({currencyList, selectedCurrency, onChangeCurrency, amount,handleOnChangeAmount }) => {

    console.log({selectedCurrency})
    return (
        <>
            
            <input type = "number" className='input' value= {amount} onChange={(e)=>handleOnChangeAmount(e)}/>
            
            <select value={selectedCurrency} onChange= {onChangeCurrency}  >
                {/* <option value="INR">inr</option>
                <option value="USD">usd</option> */}
                {currencyList.map((currency, index)=>(
                    <option key={index} value={currency} >{currency}</option> 
                ))}
            </select>
        </>
    )
}

export default Currency
