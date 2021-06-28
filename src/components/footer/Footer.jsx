import React from 'react';
import {
    Facebook,
    Instagram,
    AccountCircle,
    MailOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import { StyledProvider, Footer } from 'components-extra';
import { makeStyles, Link } from '@material-ui/core';

const StyleFooter = styled(Footer)`
    background: #4a8099;
`

const useStyles = makeStyles(() => ({
    right: {
        padding: "15px 0",
        margin: "0",
        fontSize: "14px",
        float: "right!important",
    },
    a: {
        color: 'rgb("#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5")',
        textDecoration: "none",
        backgroundColor: "transparent",
    },
}));

const FooterSite = () => {
    const classes = useStyles();

    const newTabInst = () => {
        const url = 'https://www.instagram.com/lsconsultoriasesistemas/';
        window.open(url, '_blank');
    };

    const newTabFace = () => {
        const url = 'https://www.facebook.com/lsconsultorias.srv.br';
        window.open(url, '_blank');
    };

    const newTabLS = () => {
        const url = 'https://www.lsconsultorias.srv.br/';
        window.open(url, '_blank');
    };

    return (
        <StyledProvider>
            <StyleFooter
                title='Maat Digital'
            >
                <Footer.Item icon={<AccountCircle />} onClick={newTabLS}>
                    Institucional
                </Footer.Item>
                <Footer.Item icon={<Instagram />} onClick={newTabInst}>
                    Instagram
                </Footer.Item>
                <Footer.Item icon={<Facebook />} onClick={newTabFace}>
                    Facebook
                </Footer.Item>
                <Footer.Item icon={<MailOutlined />} onClick={newTabFace}>
                    E-mail
                </Footer.Item>
            </StyleFooter>
            <div>
                <p className={classes.right}>
                    <span>
                        &copy; {1900 + new Date().getYear()}{" "}
                        Desenvolvido por
                        ,
                        <Link
                            href="#"
                            onClick={newTabLS}
                            className={classes.a}
                        >
                            LS Consultorua & Sistemas LTDA
                        </Link>
                    </span>
                </p>
            </div>
        </StyledProvider>
    );
}

export default FooterSite;