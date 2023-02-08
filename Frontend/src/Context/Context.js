import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { initialState, Reducer } from "./Reducer";

export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    setLoading(false)
    let res = await axios.get(`http://localhost:8080/products`);
    setLoading(true)
    let resdata = await res.data;
    dispatch({ type: "getAllData", payload: resdata });
  };


  useEffect(()=>{
    handleData()
   
  },[])
 


  const handleSearch=async(val)=>{
    let res=await axios.get(`http://localhost:8080/products/search/?q=${val}`)
    let resdata=await res.data;
    dispatch({type:'search',payload:resdata})
  }

  const handleFilter = async (val) => {
   if(val){
    setLoading(false);
    let res = await axios.get(
      `http://localhost:8080/products/category?category=${val}`
    );
    setLoading(true);
    let resdata = await res.data;
    dispatch({ type: "filter", payload: resdata });
   }
  
  
  };



 



  


  const ProductDetails = async (id) => {
    setLoading(false);
    let res = await axios.get(
      `http://localhost:8080/products/category/productsdetails/${id}`
    );
    let resdata = await res.data;
    setLoading(true);
    dispatch({ type: "singleProduct", payload: resdata });
  
  };




  
  const AddtoCart=(item)=>{

    dispatch({type:'Addtocart',payload:item})

  }


  const IncrementQty=(val)=>{

    dispatch({type:'IncrementQty',payload:val})
  }

  const DecrementQty=(val)=>{

    dispatch({type:'DecrementQty',payload:val})
  }

  const Wishlist=(item)=>{
    dispatch({type:'wishlist',payload:item})
  }


  const RemoveItem=(item)=>{
   
   dispatch({type:'RemoveItem',payload:item._id})
  }


  const RemoveItemwishlist=(item)=>{
    dispatch({type:'RemoveItemwishlist',payload:item._id})
  }


 

  

  return (
    <ContextApi.Provider
      value={{ state, loading, handleData,handleSearch, handleFilter, ProductDetails,AddtoCart,Wishlist,RemoveItem,RemoveItemwishlist,IncrementQty,DecrementQty}}
    >
      {children}
    </ContextApi.Provider>
  );
};
