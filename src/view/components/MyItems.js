import React, {useEffect} from "react";
import { connect } from "react-redux";
import { createItem, deleteItem, getItems, updateItem } from "../../state/actions";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import ItemPage from "./items/ItemPage";
import ItemCards from "./items/ItemCards";
import { Button } from "@material-ui/core";
import { API_START } from "../../state/_shared/store/constants";
import ItemForm from "./forms/ItemForm";
import { useSearchBar } from "../../common/hooks/useSearchBar";
const MyItems=(props)=>{
    const {getItems,apiStatus,myItems} = props;

    const [searchItem, setSearchTerm, searchValue, setInitialSearch] = useSearchBar(myItems)
    // console.log(myItems)
    // console.log(searchItem)
    // useEffect(()=>{
    //     // initial API call on mount
    //     getItems();
    //     setInitialSearch([...myItems])
    // },[getItems]);

    const match = useRouteMatch();
    // console.log("this is the my item page",match.path)
    useEffect(()=>{
        // initial API call on mount
        getItems();
    },[getItems]);
    useEffect(()=>{
        setInitialSearch([...myItems])
    },[myItems, setInitialSearch]);

    const handleSearchTerm = (e) => {

      setSearchTerm(e.target.value)
    }

    const history = useHistory();
    const renderButtons=(id)=>{
        return(
        <>
            <Button size="small" color="primary" onClick={()=>history.push(`${match.url}/${id}`)}>
                Edit
            </Button>
            <Button size="small" color="secondary" onClick={()=>deleteItem(null,id)}>
                Delete
            </Button>
        </>
      );
    };
    const updateItemAPI=(isSuccessful)=>{
        if(isSuccessful){
            history.push(`${match.url}`);
        }
    };
    const createItem=(form)=>{
        console.log("createItem ",{...form,user_id:props.user_id});
        props.createItem({...form,user_id:props.user_id},()=>{});
    };
    const updateItem=(form,id)=>{
        console.log("updateItem",form,id);
        props.updateItem({...form,user_id:props.user_id},id,updateItemAPI);
    };
    const deleteItem=(form,id)=>{
        console.log("deleteItem",form,id);
        props.deleteItem(id,()=>{});
    };
    return(
        <>
            <Switch>
                <Route path={`${match.path}/:id`}>
                    <>
                        <ItemPage myItems={myItems} apiCall={updateItem}/>
                        
                    </>
                </Route>
                <Route path={`${match.path}`}>
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
                        <ItemForm apiCall={createItem}/>
                      </div>  
                    </div>
                  </div>  
                </Route>
            </Switch>
        </>
    );
};
const mapStateToProps=(state)=>{
    return{
        apiStatus:state.api.getItems.status,
        myItems:state.user.items,
        user_id:state.user.id
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getItems:()=>dispatch(getItems()), 
        createItem:(item,handleAPIStatus)=>dispatch(createItem(item,handleAPIStatus)),
        updateItem:(item,id,handleAPIStatus)=>dispatch(updateItem(item,id,handleAPIStatus)),
        deleteItem:(id,handleAPIStatus)=>dispatch(deleteItem(id,handleAPIStatus))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(MyItems);