import React, { useState, useEffect} from "react";
import ItemCards from "./items/ItemCards";
import { connect } from "react-redux";
import { getItems,addToCart, removeFromCart } from "../../state/actions";
import { API_START } from "../../state/_shared/store/constants";
import { useSearchBar } from "../../common/hooks/useSearchBar";

import { Button } from "@material-ui/core";
const Marketplace=(props)=>{
    const {items, apiStatus,getItems} = props;
    const [searchItem, setSearchTerm, searchValue, setInitialSearch] = useSearchBar(items)
    console.log(items)
    console.log(searchItem)
    useEffect(()=>{
        // initial API call on mount
        getItems();
        setInitialSearch([...items])
    },[getItems]);
    const isInCart=(id)=>{
        // helper function to check if an item is in the cart
        return props.cart.includes(id);
    };
    const toggleCart=(id)=>{
        if(isInCart(id)){
            props.removeFromCart(id);
        }
        else{
            props.addToCart(id);
        }
    };
    const renderButtons=(id)=>{
        return(
        <>
            <Button size="small" style={{color: '#333'}} onClick={()=>toggleCart(id)}>
                {isInCart(id) ? "Remove" : "Add To Cart"}
            </Button>
        </>
      );
    };

    const handleSearchTerm = (e) => {
      setSearchTerm(e.target.value)
    }



    return (


      <>
        <div className={"flex mx-w-sm mx-auto px-40"}>
          <div>
            <input 
            value={searchValue}
            placeholder="Search..."
            onChange={handleSearchTerm}
            />
          </div>
        </div>
        <ItemCards isLoading={apiStatus===API_START} items={searchItem} renderButtons={renderButtons}/>
      </>
    );
};
const mapStateToProps=(state)=>{
    return{
        items:state.items,
        cart:state.user.cart,
        apiStatus:state.api.getItems.status
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getItems:()=>dispatch(getItems()), 
        addToCart:(id)=>dispatch(addToCart(id)), 
        removeFromCart:(id)=>dispatch(removeFromCart(id)) 
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Marketplace);