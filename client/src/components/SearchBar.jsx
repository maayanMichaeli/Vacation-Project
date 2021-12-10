import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FeaturedPost from './FeatheredPost';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '100vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'scroll',
    p: 4,
};

function SearchBar({ vacation }) {

    const [searchDes, setSearchDes] = useState([]);
    const [searchedVac, setSearchedVac] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const searchDesc = async () => {
        const res = await fetch(`/vacation/search`, {
            method: 'post',
            body: JSON.stringify({ destination: searchDes }),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            }
        });
        const data = await res.json();
        if (!data.err) {
            handleOpen();
            setSearchedVac(data);
        }
    };

    return (
        <div className="search">
            <Grid>
                <TextField size='small' type="text" placeholder="Search By Description" onChange={e => setSearchDes(e.target.value)} />
                <Button id="description" variant='contained' size="small" onClick={searchDesc}>🔎</Button>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4">
                        Search Results
                    </Typography>
                    <Grid id="modal-modal-description" sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {searchedVac.map(vac => <FeaturedPost vacation={vac} />)}
                        <Button onClick={handleClose} variant="contained">Close</Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default SearchBar;
