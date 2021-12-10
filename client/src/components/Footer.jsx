import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


function Footer({ title }) {

    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                </Typography>
                <img src="https://cdn.travalliancemedia.com/images/ba41352b-9cdc-e511-8b9f-0050568e420d/56a00de8-b0b6-febf-19be-6a0af7ee2a92/457x182.png" />
            </Container>
        </Box>
    );
}

Footer.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Footer;