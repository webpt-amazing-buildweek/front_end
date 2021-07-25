import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import placeholder from "../../../assets/placeholder.png";
import { LinearProgress,Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const baseUri = "https://spoonacular.com/recipeImages/";

const useStyles = makeStyles({
  root: {
    width: 375,
    minWidth: 375,
    height: 450,
    padding: "5vh 0",
    margin: "1vh 5vh",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    backgroundColor: '#FAFAFA',
    boxShadow: '0 0 1rem #444'
  },
  media: {
    height: 140,
  },
  action: {
    minHeight: 300,
  },
  progress: {
    width: '350px'
  }
});

const ItemCards = (props) => {
  const { items, isLoading, renderButtons } = props;

  const [expandItem, setExpandItem] = useState(-1);
  const classes = useStyles();


  if (isLoading) {
    return (
      <div
        className={
          "flex flex-row flex-wrap justify-center align-start w-screen h-screen p-10 -my-64 bg-white"
        }
      >
        <h5 className={'text-black'}>
          Your delicious results are on their way...
        </h5>
        <LinearProgress  />
      </div>
    );
  } else {
    return (
      <>
        <div
          className={
            "flex flex-row flex-wrap justify-center w-screen h-auto p-32 -my-72 bg-white shadow-inner "
          }
        >
          {items &&
            items.map((item) => {
              const {id} = item;
              return (
                <Card key={id} className={classes.root}>
                  <CardActionArea className={classes.action}>
                    <CardMedia
                      className={classes.media}
                      image={placeholder}
                      title={item.item_name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.item_name}
                      </Typography>
                      <CardContent className={"flex flex-row flex-wrap justify-between"}>
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
                        <Button size="small" color="primary" onClick={()=>expandItem===id?setExpandItem(-1):setExpandItem(id)}>
                          {expandItem===id? <ExpandLessIcon/>:<ExpandMoreIcon />}
                        </Button>
                        {
                          expandItem===id?
                          <Typography
                          variant="body2"
                          color="primary"
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
            })}
        </div>
      </>
    );
  }
};


export default ItemCards;
