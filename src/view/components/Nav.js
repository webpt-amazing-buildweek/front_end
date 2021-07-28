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
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
          <Link to={"login"} onClick={handleDrawerClose}>
            <ListItemText primary="Log In" />
          </Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
          <Link to={"signup"} onClick={handleDrawerClose}>
            <ListItemText primary="Sign Up" />
          </Link>
      </ListItem>
      </>
      )
    }
    if (props.user.id >= 0) {
      return (
      <>
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
          <Link to={"marketplace"} onClick={handleDrawerClose}>
            <ListItemText primary="Marketplace" />
          </Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
          <Link to={"cart"} onClick={handleDrawerClose}>
            <ListItemText primary="Cart" />
          </Link>
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>
      </>
      )
    }
    if (props.user.isOwner) {
      return (
        <>
        <ListItem button>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
            <Link to={"marketplace"} onClick={handleDrawerClose}>
              <ListItemText primary="Marketplace" />
            </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
            <Link to={"myitems"} onClick={handleDrawerClose}>
              <ListItemText primary="My Items" />
            </Link>
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LibraryBooksIcon />
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
        {renderUserNav()}
          <ListItem button>
            <ListItemIcon>
            <EmojiPeopleIcon />
            </ListItemIcon>
            <Link to={"/"} onClick={handleDrawerClose}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
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