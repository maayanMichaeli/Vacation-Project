import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import AddVac from './AddVac';

function Header(props) {
    const history = useHistory();
    const handleLogout = async () => {
        const res = await fetch('/users/logout', {
            method: 'delete'
        });
        const data = await res.json();
        if (!data.err) {
            localStorage.removeItem('user');
            history.push('/');
        };
    };
    const { title, vacation, setVacations, updateView, arrDate, retDate } = props;

    const directToStats = () => {
        history.push('/stats');
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {localStorage.user === 'admin' ? <Button variant="contained" size="small" onClick={directToStats}>Stats</Button> : null}
                {localStorage.user === 'admin' ? <AddVac vacation={vacation} setVacations={setVacations} updateView={updateView} arrDate={arrDate} retDate={retDate} /> : null}
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <IconButton>
                </IconButton>
                <Button onClick={handleLogout} variant="outlined" size="small">
                    Logout
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;