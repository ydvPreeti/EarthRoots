import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function InfoBox({info}){
    // const initUrl = import.meta.env.VITE_INIT_URL;
        const initUrl = info.cityimage || 'https://unsplash.com/photos/an-artists-rendering-of-a-large-white-building-ewcCi3SzcoQ';
        console.log(initUrl);

    
    return(
        <div className="InfoBox">
            <h3>OriginInfo: {info.state}</h3>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={initUrl || 'https://unsplash.com/photos/an-artists-rendering-of-a-large-white-building-ewcCi3SzcoQ'}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {info.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
                    <div className='info'>
                        country = {info.country}
                        <br />
                        lat = {info.lat}
                        <br />
                        lon = {info.lon}
                        <br />
                        {/* local_names = {info.local_names} */}
                        state = {info.state}
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </div>
    );
}