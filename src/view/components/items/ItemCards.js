import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";

import { LinearProgress } from "@material-ui/core";

import ItemCard from "./ItemCard";


const useStyles = makeStyles({
  root: {
    width: 375,
    minWidth: 375,
    height: 450,
    padding: "5vh 0",
    margin: "5vh 5vh",
    borderRadius: "25px",
    top: "50%",
    left: "50%",
    backgroundColor: '#b4a284',
    color:'#cbd18f',
    boxShadow: '0 0 1rem #000'
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
          Fetching Items...
        </h5>
        <LinearProgress />
      </div>
    );
  } else {
    return (
      <div>
        <div >
          <div
            className={
              "flex flex-row flex-wrap justify-center w-screen h-auto p-32 -my-48 -mb-1 shadow-inner "
            }
            style={{backgroundColor:  "#a2a595"}}
          >
          
            {
              items.map((item,index)=>
              <ItemCard key={index} item={item} classes={classes} expandItem={expandItem} setExpandItem={setExpandItem} renderButtons={renderButtons}/>)
            }
          </div>
        </div>
      </div>
    );
  }
};


export default ItemCards;
