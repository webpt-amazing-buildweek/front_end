import React from "react";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import ItemForm from "../forms/ItemForm";
const ItemPage=(props)=>{
    const params = useParams();
    const {myItems,apiCall} = props;
    const item = myItems.find(item=>parseInt(params.id)===item.id);
    if(!item){
        return <div></div>;
    }
    return(
        <>
            <Typography gutterBottom variant="h5" component="h2">
                {item.item_name}
            </Typography>
            <Typography
                variant="body2"
                color="primary"
                component="p"
            >
                Location: {item.location}
            </Typography>
            <Typography
                variant="body2"
                color="primary"
                component="p"
            >
                Quantity: {item.quantity}
            </Typography>
            <Typography
                variant="body2"
                color="primary"
                component="p"
            >
                ${item.price}
            </Typography>
            <Typography
            variant="body2"
            color="primary"
            component="p"
            >
                Description: {item.description}
            </Typography>
            <ItemForm apiCall={apiCall} initialForm={item}/>
        </>
    )
};

export default ItemPage;