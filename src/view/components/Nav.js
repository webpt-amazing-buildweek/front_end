//this component is used to build the navigation bar
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../src/state/actions";
import { connect } from "react-redux";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function Nav(props) {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });

  const handleDrawerOpen = () => {
    setState({ left: true });
  };
  const handleDrawerClose = () => {
    setState({ left: false });
  };

  const history = useHistory()
  const handleLogout=()=>{
    props.logout();
    history.push("/")
  };
  const renderUserNav = () => {
    if (props.user.id === -1) {
      return (
      <>  
      <ListItem button onClick={()=>{handleDrawerClose();history.push("/marketplace")}}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
            <ListItemText primary="Marketplace" />
      </ListItem>
      <ListItem button onClick={()=>{handleDrawerClose();history.push("/cart")}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
          <ListItemText primary="Cart" />
      </ListItem>
      <ListItem button onClick={()=>{handleDrawerClose();history.push("/login");}}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
            <ListItemText primary="Log In" />
      </ListItem>
      <ListItem button onClick={()=>{handleDrawerClose();history.push("/signup")}}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
            <ListItemText primary="Sign Up" />
      </ListItem>
      </>
      )
    }
    else {
      // user is logged in
      return (
      <>
      <ListItem button onClick={()=>{handleDrawerClose();history.push("/marketplace")}}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
            <ListItemText primary="Marketplace" />
      </ListItem>
      {
        props.user.isOwner?
        <>
          <ListItem button onClick={()=>{handleDrawerClose();history.push("/myitems")}}>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
                <ListItemText primary="My Items" />
          </ListItem>
        </>
        :
        <>
        <ListItem button onClick={()=>{handleDrawerClose();history.push("/cart")}}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
            <ListItemText primary="Cart" />
        </ListItem>
        </>
      }
      
      <ListItem button onClick={()=>{handleLogout();history.push("/");}}>
        <ListItemIcon>
          <DirectionsRunIcon />
        </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>
      </>
      )
    }
  }
  // will handle logout then push to landing page
  // const handleLogout = () => {

  // }

  return (
    <>
      <AppBar
        color="primary"
        style={{
          height: "10vh",
          backgroundColor: "#FAFAFA",
          width: "100vw",
        }}
        position="relative"
      >
        <div className={'flex flex-row mlfa-rotate-180'}>
          <Button onClick={handleDrawerOpen}>
            <MenuIcon className={"mt-6 ml-6"} />
          </Button>

          <Link to="/">
            <h1 className={" mt-6 ml-6 text-black text-4xl"} style={{color: 'black'}}>Sauti Marketplace</h1>
          </Link>
        </div>
      </AppBar>
      <Drawer
        color="primary"
        open={state.left}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.fullList,
        }}
      >
      <List className={classes.list}>
          <ListItem button onClick={()=>{handleLogout();history.push("/");}}>
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
              <ListItemText primary="Home" />
          </ListItem>
          {renderUserNav()}
        </List>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)