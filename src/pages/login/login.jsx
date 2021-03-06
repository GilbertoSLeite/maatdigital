import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    Hidden,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import maat from '../../files/logo/maat_digital.png';
import { Close, LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import SnackMAAT from "../../components/snackbar/snackbar";
import Acessing from "../../functions/logins/accessing";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    imagem: {
        backgroundImage: `url(${maat})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff',
        backgroundSize: '100% 100%, contain',
        backgroundPosition: 'center',
        justifyContent: 'center'
    },
    button: {
        color: '#3d864a',
        fontWeight: 'bold',
        fontSize: 'large'
    },
    avatar: {
        backgroundColor: '#4a8099',
        color: '#ffffff',
    },
    submit: {
        backgroundColor: "#4a8099",
        color: "#ffffff",
        fontWeight: 'bold'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(9.55, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const Login = () => {
    const classes = useStyles();
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [viewPass, setViewPass] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [returnTextSnack, setReturnTextSnack] = React.useState('');
    const [alertSnack, setAlertSnack] = React.useState(null);

    const viewPassWord = () => {
        setViewPass(true);
    };

    const hiddenPassWord = () => {
        setViewPass(false);
    };

    const handleCloseSnack = () => {
        setSnackOpen(false)
    };

    const HandleClose = () => {
        return (<IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => handleCloseSnack}
        >
            <Close fontSize="inherit" />
        </IconButton>
        );
    }

    const trueAcessing = () => {
        setSnackOpen(true);
        setAlertSnack('success');
        setReturnTextSnack('Acessando o Sistema!');
        setDisableButton(false);
        setTimeout(() => {
            window.location.href = '/maatdigital/home';
        }, 1500);
    }

    const falseAcessing = () => {
        setSnackOpen(true);
        setAlertSnack('error');
        setReturnTextSnack('Senha ou Usu??rio Errado!');
        setDisableButton(false);
    }

    const accessingSystem = async () => await Acessing(user, password) ? trueAcessing() : falseAcessing()

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridLogin"
                    container
                    component='main'
                    spacing={3}
                    direction="row"
                    justify="space-around"
                    elevation={4}
                >
                    <Hidden mdDown>
                        <Grid
                            aria-label='Logo da Maat Digital'
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            className={classes.imagem}
                        />
                    </Hidden>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={8}
                        square
                    >
                        <div className={classes.paper}>
                            <Avatar aria-label='??cone Cadeado'>
                                <LockOutlined />
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                ACESSAR A BIBLIOTECA
                            </Typography>
                            <form className={classes.form}>
                                <Tooltip arrow title='Aqui voc?? deve inserir o seu e-mail.'>
                                    <TextField
                                        id='user'
                                        aria-labelledby='user'
                                        variant='outlined'
                                        margin='dense'
                                        label='Digite o Seu Usu??rio'
                                        onChange={e => setUser(e.target.value)}
                                        required
                                        fullWidth
                                    />
                                </Tooltip>
                                <Tooltip arrow title='Aqui voc?? deve inserir a sua senha pessoa. Caso queira ver a senha digitada, clique no olho  do lado direito.'>
                                    <TextField
                                        id='password'
                                        aria-labelledby='password'
                                        margin='dense'
                                        variant='outlined'
                                        name='Digite Sua senha'
                                        label='Digite Sua senha'
                                        type={viewPass ? 'text' : 'password'}
                                        autoComplete='current-password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={viewPass ? hiddenPassWord : viewPassWord}>
                                                        {viewPass ? <Visibility className={classes.avatar} /> : <VisibilityOff className={classes.avatar} />}
                                                    </IconButton>
                                                </InputAdornment>)
                                        }}
                                    />
                                </Tooltip>
                                <Button
                                    aria-labelledby='Bot??o Acessar'
                                    fullWidth variant='outlined'
                                    className={classes.submit}
                                    onClick={accessingSystem}
                                    disabled={buttonDisable}
                                >
                                    ACESSAR
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {snackOpen &&
                <SnackMAAT
                    open={snackOpen}
                    close={handleCloseSnack}
                    handleClose={<HandleClose />}
                    textSnack={returnTextSnack}
                    alert={alertSnack}
                />}
        </React.Fragment>
    );
}

export default Login;