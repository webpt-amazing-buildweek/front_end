import React from 'react';
import StripeContainer from './StripeContainer';
import { Typography } from '@material-ui/core';
const Checkout=()=>{
    return(
        <div className={"flex flex-col text-center"}>
            <div className={"parallax-wrapper self-center bg-white text-black mt-96"} style={{backgroundColor:  "#a2a595"}}>
                <Typography gutterBottom variant="h3" component="h2"  style={{color: '#DDD', textShadow: '0 0 .5rem black'}}>
                    Checkout
                </Typography>
                <div
                    className={
                    "flex flex-row flex-wrap justify-center"
                    }
                >
                    <StripeContainer />

                </div>
            </div>
        </div>


    );
};
export default Checkout;