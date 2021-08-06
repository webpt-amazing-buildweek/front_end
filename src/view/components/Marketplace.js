import React, { useEffect} from "react";
import ItemCards from "./items/ItemCards";
import { connect } from "react-redux";
import { getItems,addToCart, removeFromCart } from "../../state/actions";
import { API_START } from "../../state/_shared/store/constants";
import { useSearchBar } from "../../common/hooks/useSearchBar";

import { Button } from "@material-ui/core";
const Marketplace=(props)=>{
    const {items, apiStatus,getItems} = props;
    const [searchItem, setSearchTerm, searchValue, setInitialSearch] = useSearchBar(items)
    useEffect(()=>{
        // initial API call on mount
        getItems();
    },[getItems]);
    useEffect(()=>{
        setInitialSearch([...items]);
    },[setInitialSearch,items]);
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
        <div className={"flex flex-col text-center"}>
            <div className={"parallax-wrapper self-center bg-white text-black mt-96"}>
                <div
                    className={
                    "flex flex-row flex-wrap justify-center"
                    }
                    style={{backgroundColor:  "#a2a595"}}
                >
                    <div className={"absolute -inset-y-0 rounded"}>
                        <div>
                            <input 
                            className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"}
                            value={searchValue}
                            placeholder="Search..."
                            onChange={handleSearchTerm}
                            />
                        </div>
                    </div> 
                    <ItemCards isLoading={apiStatus===API_START} items={searchItem} renderButtons={renderButtons}/>
                 </div>
            </div>
        </div>


    //   <div className={"flex flex-col text-center"}>
    //     <div className={"mt-8 mb-20 mx-auto"}>
    //       <div className={"absolute"}>
    //         <input 
    //         value={searchValue}
    //         placeholder="Search..."
    //         onChange={handleSearchTerm}
    //         />
    //       </div>
    //     </div>
    //     <ItemCards isLoading={apiStatus===API_START} items={searchItem} renderButtons={renderButtons}/>
    //   </div>
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