import React,{useEffect} from "react";
import {getItems,removeFromCart} from "../../state/actions";
import { connect } from "react-redux";
import { Typography,Button } from "@material-ui/core";
import ItemCards from "./items/ItemCards";
import { API_START } from "../../state/_shared/store/constants";
import { useHistory } from "react-router";
const Cart=(props)=>{
    const history = useHistory();
    useEffect(()=>{
        // initial API call on mount
        getItems();
    },[]);
    const renderButtons=(id)=>{
        return(
        <>
            <Button size="small" style={{color: '#333'}} onClick={()=>props.removeFromCart(id)}>
                remove from cart
            </Button>
        </>
      );
    };
    return (
        <div className={"flex flex-col text-center"}>
            <div className={"parallax-wrapper self-center bg-white text-black mt-96"} style={{backgroundColor:  "#a2a595"}}>
                <div
                    className={
                    "flex flex-row flex-wrap justify-center"
                    }
                    
                >
                    <div className={"absolute -inset-y-0 rounded"}>
                        <Typography gutterBottom variant="h3" component="h2"  style={{color: '#DDD', textShadow: '0 0 .5rem black'}}>
                            Shopping Cart
                        </Typography>
                        <div className="flex flex-col flex-wrap justify-center">
                            <div>
                                <button className={"shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-px"} type="submit" onClick={()=>history.push("/marketplace")}>Continue Shopping</button>
                            </div>
                            <div>
                                <button className={"shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-px"} type="submit" onClick={()=>history.push("/checkout")} disabled={props.cart.length===0}>Checkout</button>
                            </div>
                        </div>
                        <div style={{padding:"5vh 0"}}>
                            {
                                props.cart.length !==0?
                                <ItemCards isLoading={props.apiStatus===API_START} items={props.items} renderButtons={renderButtons}/>
                                :
                                <div>Your cart is empty</div>
                            }
                        </div>

                    </div> 
                </div>
            </div>
        </div>
    );
};
const mapStateToProps=(state)=>{
    return {
        cart: state.user.cart,
        items: state.user.cart.map((cartItem)=>state.items.find((item)=>item.id===cartItem)),
        apiStatus:state.api.getItems.status
    };
};
const mapDispatchToProps=(dispatch)=>{
    return {
        removeFromCart:(id)=>dispatch(removeFromCart(id)),
        getItems:()=>dispatch(getItems())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);