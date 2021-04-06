import React from "react";
import { 
    AppBar,
    fade,
    Hidden,
    IconButton,
    makeStyles, 
    Menu, 
    MenuItem, 
    TextField, 
    Toolbar,
    Typography
    } from "@material-ui/core";
import { HomeOutlined, Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import pageRoutes from "../../router";

let rotas = pageRoutes.map(x => x);

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    AppBar: {
        backgroundColor: '#5890a6',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    Search: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from Search
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    iconAppBAr: {
        width: '50px'
    },
    paperMenu: {
        border: '1px solid #d3d4d5',
    },
    tipografiaAppBar: {
        marginLeft: '5%'
    },
    tipografiaAppBarUser: {
        marginLeft: '5%',
        fontSize: 10
    },
    menuAppbar: {
        color: '#ffff'
    }
}));

export default function AppBarSys() {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const searchPage = (value) => {
        window.location.href = value;   
    };

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);    
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const mobileMenuId = 'menu-mobile';
    const renderMobileMenu = ( 
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    aria-label='Home'
                    color='inherit'
                    href='/maatdigital/home'
                >
                    <HomeOutlined fontSize='small' />
                    <Typography
                        align='center'
                        variant='button'
                        gutterBottom
                        display='inline'
                        className={classes.tipografiaAppBar}
                    >
                        Home
                    </Typography>
                </IconButton>
            </MenuItem>
        </Menu>
    )

    return(
        <React.Fragment>
            <div className={classes.grow}>
                <AppBar
                    className={classes.AppBar}
                    position='static'
                >
                    <Toolbar>
                        <Hidden
                            smUp
                        >
                            <IconButton 
                                arial-label='show menu'
                                arial-aria-controls={mobileMenuId}
                            >
                            </IconButton>
                        </Hidden>
                        <div 
                            className={classes.search}
                        >
                            <div
                                className={classes.search}
                            >
                                <Search />
                            </div>
                            <Autocomplete 
                                aria-label='search'
                                id='search'
                                autoComplete
                                getOptionLabel={
                                    (o) => o.name
                                }
                                onChange={(e,v) => searchPage(!v ? '' : v.path)}
                                options={rotas}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        className={classes.input}
                                        placeholder='Pesquisar'
                                        margin='dense'
                                        fullWidth
                                    />}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                            aria-label="Home"
                            color="inherit"
                            href='/maatdigital/home'>
                                <HomeOutlined fontSize='small' />
                                <Typography
                                    align='center'
                                    variant='button'
                                    gutterBottom
                                    display='inline'
                                    className={classes.tipografiaAppBar}
                                >
                                    Home
                                </Typography>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
        </React.Fragment>
    )
    
}