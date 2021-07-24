import React, {useEffect} from "react";
import ItemCards from "./items/ItemCards";
import { connect } from "react-redux";
import { getItems,addToCart, removeFromCart } from "../../state/actions";
import { API_START } from "../../state/_shared/store/constants";

import { Button } from "@material-ui/core";
const Marketplace=(props)=>{
    const {items, apiStatus,getItems} = props;
    useEffect(()=>{
        // initial API call on mount
        getItems();
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
            <Button size="small" color="primary" onClick={()=>toggleCart(id)}>
                {isInCart(id) ? "Remove" : "Add To Cart"}
            </Button>
        </>
      );
    };


    return (
        <>
            <ItemCards isLoading={apiStatus===API_START} items={items} renderButtons={renderButtons}/>
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
        addToCart:(id)=>dispatch(addToCart(id)), //needs implementation in redux
        removeFromCart:(id)=>dispatch(removeFromCart(id)) //needs implementation in redux
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Marketplace);