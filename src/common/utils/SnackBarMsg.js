import React,{useState} from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    barPosition:{
        position:"fixed",
    }
})
const SnackBarMsg=(props)=>{
    const classes = useStyles();
    // severity:
    // error, warning, info, success
    const [open, setOpen] = useState(true);
    const {severity} = props;
    const handleClose=()=>{
        setOpen(false);
    }
    return(
        <Snackbar className={classes.barPosition} open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={
            {
                vertical: 'bottom',
                horizontal: 'left'
            }}>
            <MuiAlert elevation={6} variant="filled" severity={severity} {...props}/>
        </Snackbar>
    );
};

export default SnackBarMsg;