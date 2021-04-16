import React from 'react';
import {
    Facebook,
    Instagram,
    AccountCircle,
    MailOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import { StyledProvider, Footer } from 'components-extra';

const StyleFooter = styled(Footer)`
    background: #4a8099;
`

export default function FooterSite() {

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
                title='MAAT DIGITAL'
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
        </StyledProvider>
    );
};