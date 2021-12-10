import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'follow' } };

export default function IconCheckboxes({ vacation, followVac, unfollowVac }) {
    return (
        <div>
            <Checkbox checked={vacation.follow} onChange={vacation.follow ? unfollowVac : followVac} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
        </div>
    );
}