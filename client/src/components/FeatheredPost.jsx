import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FollowBtn from './FollowBtn';
import DeleteVac from './DeleteVac';
import EditVac from './EditVac';

function FeaturedPost({ vacation, setVacations, updateView }) {

    const followVac = async () => {
        const res = await fetch(`/users/follow/${vacation.id}`, {
            method: 'post',
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.err) {
            updateView();
        }
    };

    const unfollowVac = async () => {
        const res = await fetch(`/users/unfollow/${vacation.id}`, {
            method: 'delete',
            credentials: 'include',
        });
        const data = await res.json();
        if (!data.err) {
            updateView();
        }

    };

    return (
        <Grid item xs={12} md={12}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        {localStorage.user === 'admin' ? <DeleteVac vacation={vacation} setVacations={setVacations} updateView={updateView} /> : null}
                        {localStorage.user === 'admin' ? <EditVac vacation={vacation} setVacations={setVacations} updateView={updateView} /> : null}
                        <Typography component="h2" variant="h5">
                            {vacation.title}
                            {localStorage.user === 'user' ? <FollowBtn vacation={vacation} followVac={followVac} unfollowVac={unfollowVac} /> : null}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {vacation.destination}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {vacation.arrDate + '-' + vacation.retDate}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {vacation.price}$
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {vacation.description}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 500, display: { xs: 'none', sm: 'block' } }}
                        image={vacation.img}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
}


export default FeaturedPost;