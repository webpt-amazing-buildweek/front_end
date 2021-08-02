import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Button } from "@material-ui/core";
import placeholder from "../../../assets/placeholder.png"
const ItemCard=(props)=>{
    const {item,classes,expandItem,setExpandItem,renderButtons} = props;
    const {id} = item;
    return(
        <Card key={id} className={classes.root}>
            <CardActionArea className={classes.action}>
                <CardMedia
                    className={classes.media}
                    image={item.image_url?item.image_url:placeholder}
                    title={item.item_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2"  style={{color: '#DDD', textShadow: '0 0 .5rem black'}}>
                        {item.item_name}
                    </Typography>
                    <CardContent className={"flex flex-row flex-wrap justify-between"}>
                    <Typography
                        variant="body2"
                        style={{color: '#f6ead4'}}
                        component="p"
                    >
                        Location: {item.location}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        style={{color: '#f6ead4'}}
                    >
                        Quantity: {item.quantity}
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{color: '#f6ead4'}}
                        component="p"
                    >
                        ${item.price}
                    </Typography>
                    <Button size="small" style={{color: 'white'}} onClick={()=>expandItem===id?setExpandItem(-1):setExpandItem(id)}>
                        {expandItem===id? <ExpandLessIcon/>:<ExpandMoreIcon />}
                    </Button>
                    {
                        expandItem===id?
                        <Typography
                        variant="body2"
                        style={{color: '#f6ead4'}}
                        component="p"
                        >
                        Description: {item.description}
                        </Typography>
                        :
                        ""
                    }
                    </CardContent>
                </CardContent>
            </CardActionArea>
            <CardActions className={'flex justify-center'}>
                {renderButtons(id)}
            </CardActions>
        </Card>
    );
};
export default ItemCard;