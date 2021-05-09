import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import pageRoutes from '../../router';
import { 
  AppBar, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  makeStyles, 
  Toolbar,
  Tooltip,
  Typography,
  useTheme
  } from '@material-ui/core';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExitToApp, 
  Menu 
  } from '@material-ui/icons';
import IsAuthenticated from '../../functions/localstorage/isAuthenticated';
import Logout from '../../functions/localstorage/logout';

const drawerWidth = 240;
const isAuth = IsAuthenticated();
const FilterPages = (arrayRoutes) => (isAuth ? PrivatePage(arrayRoutes) : LoginPage(arrayRoutes))
const PrivatePage = (arrayRoutes)  => (!arrayRoutes.loginPage ? arrayRoutes : null)
const LoginPage = (arrayRoutes) => (arrayRoutes.loginPage ? arrayRoutes : null)
const rotasPaginas = pageRoutes.map( x => x).filter(FilterPages);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#4a8099'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawerMaat(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {Main} = props;

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            MAAT DIGITAL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {rotasPaginas.map((data, key) => (
            <Tooltip aria-label='Balão dos Icones' arrow title={data.name}>
              <ListItem button component='a' href={data.path} key={key} divider dense>
                <ListItemIcon><data.icon/></ListItemIcon>
                <ListItemText primary={data.name}/>
              </ListItem>
            </Tooltip>
          ))}
          <ListItem button component='a' onClick={Logout} divider dense>
            <ListItemIcon><ExitToApp/></ListItemIcon>
            <ListItemText primary='Sair'/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {Main}
      </main>
    </div>
  );
}

MiniDrawerMaat.propTypes = {
    Main: PropTypes.object.isRequired,
}