import axios from 'axios';
import { useState } from 'react';
import { RiExchangeLine, RiVisaLine } from 'react-icons/ri'
import { MdDone } from "react-icons/md"
import {VscError} from "react-icons/vsc"





function ExchangeComponent() {
    const [currency, setCurrency] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')
    const [isActive, setActive] = useState(false)
    const [isError, setError] = useState(false)
   


    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;


    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.button === 0) {
            axios.get(url, {
                method: 'get',
                redirect: 'follow',
                headers: { 'apikey' : 'y8oT68AQGd7v4i9fKWHQhsms4ItzANZ5' },
            })
                .then(function (response) {
                    console.log(response);
                    setCurrency(response.data)
                    setActive(true)
                })
                .catch(function (error) {
                    console.log(error);
                    setActive(false)
                    setError(true)

                })
                .then(function () {
                    // always executed
                });
        }
    }


    return (
        <div className='mx-auto max-w-sm mt-20 '>
            <div className='mb-10'>
               <p className='text-white text-center'>Currency conversion, which can be used to convert any amount from one currency to another.</p>
            </div>
            <form className={isActive ? "bg-cyan-400 flex flex-col  gap-5 rounded-lg p-6 text-xs tracking-widest relative" : " bg-slate-800 flex flex-col border-2 gap-5 rounded-lg p-6 text-xs tracking-widest relative text-slate-200 font-normal "}>
                <div className='flex flex-col gap-3'>
                    <label>
                        <p className={isActive ? 'opacity-0' : ''}>FROM</p>
                        <RiVisaLine className={isActive ? 'absolute top-3 right-6 text-neutral-900' : 'absolute top-3 right-6 text-yellow-300'  } size={40} />
                    </label>
                    <input type="text" value={from} required onChange={e => setFrom(e.target.value)} className={isActive ? "bg-slate-400 opacity-0 border-b-2 uppercase cursor-default" : "bg-slate-800 border-b-2  uppercase "}></input>
                </div>
                <div className={isActive ? 'opacity-0 flex flex-col gap-3 cursor-default' : 'flex flex-col gap-3'}>
                    <label>TO</label>
                    <input type="text" required value={to} onChange={e => setTo(e.target.value)} className={isActive ?" bg-slate-800 border-b-2  uppercase cursor-default" : " bg-slate-800 border-b-2  uppercase"}></input>
                </div>
                <div className={isActive ? 'opacity-0 flex flex-col gap-3 cursor-default' : 'flex flex-col gap-3'}>
                    <label>AMOUNT</label>
                    <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} className={isActive ?" bg-slate-800 border-b-2  uppercase cursor-default" : " bg-slate-800 border-b-2  uppercase"}></input>
                </div>
                {isActive && <div className='absolute top-36 left-10 '>
                <p className='text-base'>Actual rate: {currency.result}</p>
            </div>}
            </form>
            <div className=' flex justify-center  my-5'>
                {!isError ? !isActive && <button type="submit" onClick={handleSubmit} className=" border-2 p-1 border-red-400 rounded-full text-red-400"><RiExchangeLine  size={50} /></button> : <button type="submit" onClick={handleSubmit} className=" border-2 p-1 border-red-400 bg-red-400 text-black  rounded-full"><VscError size={50} /></button>}
                {isActive && <button type="submit" onClick={handleSubmit} className=" border-2 p-1 bg-green-400  rounded-full"><MdDone size={50} /></button>}
            </div>
            </div>
            )
}
            export default ExchangeComponent