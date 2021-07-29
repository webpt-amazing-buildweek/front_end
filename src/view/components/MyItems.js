import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { createItem, deleteItem, getItems, updateItem } from "../../state/actions";
import { Link,useRouteMatch, Switch, Route } from "react-router-dom";
import ItemPage from "./items/ItemPage";
import ItemCards from "./items/ItemCards";
import { Button } from "@material-ui/core";
import { API_START } from "../../state/_shared/store/constants";
import ItemForm from "./forms/ItemForm";
const MyItems=(props)=>{
    const {getItems,apiStatus,myItems} = props;
    const [callAPI, setCallAPI] = useState();
    const match = useRouteMatch();
    console.log("this is the my item page",match.path)
    useEffect(()=>{
        // initial API call on mount
        getItems();
    },[getItems]);
    const renderButtons=(id)=>{
        return(
        <>
            <Link size="small" color="primary" component={Button} to={`${match.url}/${id}`}>
                Edit
            </Link>
        </>
      );
    };
    return(
        <>
            <Switch>
                <Route path={`${match.path}:id`}>
                    <ItemPage myItems={myItems} />
                </Route>
                <Route path={`${match.path}`}>
                    <ItemCards isLoading={apiStatus===API_START} items={myItems} renderButtons={renderButtons}/>
                </Route>
            </Switch>
            <ItemForm />
        </>
    );
};
const mapStateToProps=(state)=>{
    return{
        apiStatus:state.api.getItems.status,
        myItems:state.user.items
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