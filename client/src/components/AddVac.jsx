import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddVac({ vacation, setVacations, updateView, arrDate, retDate }) {
    const [title, setTitle] = useState(vacation.title);
    const [destination, setDestination] = useState(vacation.title);
    const [arrival, setArrival] = useState(arrDate);
    const [returnDate, setReturnDate] = useState(retDate);
    const [img, setImg] = useState(vacation.img);
    const [description, setDescription] = useState(vacation.description);
    const [price, setPrice] = useState(vacation.price);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const btnStyle = {
        marginLeft: 2,
    };

    const handleNewVac = async () => {
        const res = await fetch(`/admin/add`, {
            method: 'post',
            body: JSON.stringify({ title, destination, arrDate: arrival, retDate: returnDate, img, description, price }),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            }
        });
        const data = await res.json();
        if (!data.err) {
            updateView();
            handleClose();
        }
    };

    return (
        <div>
            <Button variant='contained' sx={btnStyle} size="small" onClick={handleOpen}>Add Vacation</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4">
                        Add Vacation
                    </Typography>
                    <Grid id="modal-modal-description" sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField label="Title" variant="standard" onChange={e => setTitle(e.target.value)} />
                        <TextField label="Destination" variant="standard" onChange={e => setDestination(e.target.value)} />
                        <TextField label="Arrival Date" variant="standard" onChange={e => setArrival(e.target.value)} />
                        <TextField label="Return Date" variant="standard" onChange={e => setReturnDate(e.target.value)} />
                        <TextField label="Image" type='url' onChange={e => setImg(e.target.value)} />
                        <TextField label="price" type="number" onChange={e => setPrice(e.target.value)} />
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={vacation.description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Button onClick={handleNewVac} variant="contained">Add</Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}