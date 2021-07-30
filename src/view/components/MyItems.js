import React, {useEffect} from "react";
import { connect } from "react-redux";
import { createItem, deleteItem, getItems, updateItem } from "../../state/actions";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import ItemPage from "./items/ItemPage";
import ItemCards from "./items/ItemCards";
import { Button } from "@material-ui/core";
import { API_START } from "../../state/_shared/store/constants";
import ItemForm from "./forms/ItemForm";
const MyItems=(props)=>{
    const {getItems,apiStatus,myItems} = props;
    const match = useRouteMatch();
    console.log("this is the my item page",match.path)
    useEffect(()=>{
        // initial API call on mount
        getItems();
    },[getItems]);
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
                        <ItemPage myItems={myItems} />
                        <ItemForm apiCall={updateItem}/>
                    </>
                </Route>
                <Route path={`${match.path}`}>
                    <>
                        <ItemCards isLoading={apiStatus===API_START} items={myItems} renderButtons={renderButtons}/>
                        <div>spacer</div>
                        <div>spacer</div>
                        <div>spacer</div>
                        <div>spacer</div>
                        <div>spacer</div>
                        <div>spacer</div>
                        <ItemForm apiCall={createItem}/>
                    </>
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