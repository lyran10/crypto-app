import React, { useState,useEffect } from 'react'
import { useSelector,TypedUseSelectorHook} from 'react-redux/es/exports'
import { RootState } from '../redux/store'
import { numberWithCommas } from '../banner/carousel'
import { useDispatch} from 'react-redux/es/exports'
import { AppDispatch } from '../redux/store'
import { coinssList, getwatchList, singleCoin, historicalChart } from '../redux/actions'
import { DeleteCoinButton } from './deleteCoinButton'
import axios from 'axios'
import {ImSpinner2} from "react-icons/im"
import { useNavigate } from 'react-router-dom'
import { removeData } from '../redux/reducer'

type Props = {
  width : string,
  mt : string,
  sm : string,
  lg:string,
  height :string
}

type Params = {
  id :string,

}

export const WatchList = ({width,mt,sm,lg,height} :Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const selector : TypedUseSelectorHook<RootState> = useSelector
  const [selectedId,setSelectedId] = useState<string>("")
  const userLogin =  selector(state => state.currencyData.login)
  const watchlist =  selector(state => state.currencyData.watchlist)
  const userDetails =  selector(state => state.currencyData.userDetails)
  const coinslist =  selector(state => state.currencyData.coinsList)
  const symbol =  selector(state => state.currencyData.symbol)
  const currency =  selector(state => state.currencyData.currency)
  const singlecoin =  selector(state => state.currencyData.singlecoin)
  const days =  selector(state => state.currencyData.days)
 
 const deleteCoin = async(event : React.MouseEvent<HTMLButtonElement>) => {
    setSelectedId(event.currentTarget.id)
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/deletecoin`, {id : userDetails._id,coin : event.currentTarget.id},{
        headers : {Authorization: `Bearer ${userDetails.token}`},withCredentials:true
      })
     await dispatch(getwatchList(userDetails))
          setSelectedId("")
    } catch (error) {
      console.log(error)
      setSelectedId("")
    }
  }

const handleClick = (id :string) => {
  navigate(`/coin/${id}`)
  dispatch(removeData([]))
  dispatch(singleCoin(id as string))
  dispatch(historicalChart({currency,days,id}))
}

useEffect(() => {
  dispatch(getwatchList(userDetails))
},[currency])

useEffect(() => {
  dispatch(coinssList(currency))
  
},[symbol,userLogin,userDetails,singlecoin,days,currency,watchlist])

  return (
    <div className={`text-darkBlue ${sm} watchlist self-start ${lg} ${height} overflow-scroll flex-col gap-2 m-auto justify-start items-center w-[90%] ${userLogin ? `md:w-[25%] lg:w-[25%]` : "md:w-[30%] lg:w-[30%]"} rounded-md bg-darkBlue mb-10 shadow-custom md:ms-0 md:me-0 lg:me-0 lg:ms-0`}>
       <span className={`text-offWhite font-bold text-[25px] text-center ${mt}`}>Watchlist</span>
       <ul className='flex flex-col justify-center w-[100%] p-2 gap-2'>
        {coinslist && watchlist.length ? coinslist.map(coin => {
          if(watchlist.includes(coin.id)){
          return(
            <li
                  key={coin?.id}
                  className="flex justify-between text-white p-1"
                >
                  <span onClick={() => handleClick(coin.id)} className="mt-1 cursor-pointer">{coin?.name}</span>
                  <div className="flex gap-2 justify-center items-center">
                    <span className="mt-1" id={coin.id}>
                      {symbol}{" "}
                      {numberWithCommas(parseInt(coin?.current_price.toFixed(2)))}
                    </span>
                    {coin.id == selectedId ? 
                    <ImSpinner2 size={20} className='animate-spin text-offWhite'/>
                    :  <DeleteCoinButton deleteCoin={deleteCoin} coinId = {coin.id}/>}
                  </div>
                </li>
          )
        }
        }) : <div className='flex justify-center items-center'><span className='text-[15px] font-bold text-white'>No coins in the Watchlist</span></div>}
       </ul>
    </div>
  )
}