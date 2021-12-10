import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteVac({ vacation, updateView }) {
    const handleDel = async () => {
        const res = await fetch(`http://localhost:1000/admin/${vacation.id}`, {
            method: 'delete',
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.err) {
            updateView();
        }
    };
    return (
        <Stack onClick={handleDel} direction="row" spacing={1}>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
}