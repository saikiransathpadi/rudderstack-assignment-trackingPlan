import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    CircularProgress,
    Button,
} from '@mui/material';

function TrackingPlanList() {
    const [trackingPlans, setTrackingPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrackingPlans();
    }, []);

    const fetchTrackingPlans = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_TRACKING_PLAN_SERVICE + '/tracking-plan/list');
            setTrackingPlans(response?.data?.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracking plans:', error);
            setLoading(false);
        }
    };

    return (
        <Box maxWidth='800px' margin='0 auto' padding='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom='15px'>
                <Typography variant='h5' gutterBottom>
                    Tracking Plans
                </Typography>
                <Button component={Link} to='/add-plan' variant='contained' color='primary'>
                    Create Plan
                </Button>
            </Box>
            {loading ? (
                <div className='loading-overlay'>
                    <CircularProgress className='loading-spinner' />
                </div>
            ) : (
                <div>
                    {trackingPlans.map((plan: any) => (
                        <Paper key={plan._id} elevation={3} style={{ marginBottom: '20px', padding: '15px' }}>
                            <Typography variant='h6'>
                                <b>Track Plan Name: </b>
                                {plan.display_name}
                            </Typography>
                            <Typography variant='body1' color='textSecondary' gutterBottom>
                                <b>Track Plan Description: </b>
                                {plan.description}
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Rules</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {plan.events.map((event: any) => (
                                            <TableRow key={event._id}>
                                                <TableCell>
                                                    <em>{event.name}</em>
                                                </TableCell>
                                                <TableCell>{event.description}</TableCell>
                                                <TableCell>
                                                    <pre>{JSON.stringify(event.rules)}</pre>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    ))}
                </div>
            )}
        </Box>
    );
}

export default TrackingPlanList;
