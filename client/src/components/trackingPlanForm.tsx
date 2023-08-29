import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TrackingPlanForm = () => {
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [events, setEvents] = useState([{ name: '', description: '', rules: '' }]);
    const history = useNavigate();

    const addEvent = () => {
        setEvents([...events, { name: '', description: '', rules: '' }]);
    };

    const removeEvent = (index: any) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
    };

    const validateEvent = (event: any) => {
        if (!event.name || !event.description || !event.rules) {
            return false;
        }
        try {
            JSON.parse(event.rules);
        } catch (error) {
            return false;
        }
        return true;
    };

    const createTrackingPlan = async () => {
        try {
            if (!displayName || !description || events.length === 0) {
                alert('Please fill in all mandatory fields and add at least one event.');
                return;
            }
            const isAllEventsValid = events.every(validateEvent);
            if (!isAllEventsValid) {
                alert('Please provide valid event details for each event.');
                return;
            }

            const response = await axios.post(process.env.REACT_APP_TRACKING_PLAN_SERVICE + '/tracking-plan/create', {
                display_name: displayName,
                description,
                events: events.map((i: any) => ({ ...i, rules: JSON.parse(i.rules) })),
            });

            console.log('Tracking plan created:', response.data);
            setDisplayName('');
            setDescription('');
            setEvents([{ name: '', description: '', rules: '' }]);
            history('/');
        } catch (error: any) {
            console.error('Error creating tracking plan:', error.response);
            alert(error?.response?.data?.message || 'Something went wrong');
        }
    };

    const handleEventChange = (index: any, field: any, value: any) => {
        const updatedEvents: any = [...events];
        updatedEvents[index][field] = value;
        setEvents(updatedEvents);
    };

    return (
        <Box maxWidth='600px' margin='0 auto' padding='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom='15px'>
                <Typography variant='h5' gutterBottom>
                    Add Tracking Plans
                </Typography>
                <Button component={Link} to='/' variant='contained' color='primary'>
                    View Plans
                </Button>
            </Box>
            <TextField
                label='Display Name *'
                fullWidth
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                margin='normal'
                required
            />
            <TextField
                label='Description *'
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin='normal'
                required
            />
            {events.map((event, index) => (
                <Paper key={index} elevation={3} style={{ padding: '15px', marginBottom: '15px' }}>
                    <Typography variant='h6'>Event {index + 1}</Typography>
                    <Button variant='outlined' color='secondary' onClick={() => removeEvent(index)} style={{ marginTop: '5px' }}>
                        Delete Event
                    </Button>
                    <TextField
                        label='Event Name'
                        fullWidth
                        value={event.name}
                        onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                        margin='normal'
                    />
                    <TextField
                        label='Event Description'
                        fullWidth
                        value={event.description}
                        onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                        margin='normal'
                    />
                    <TextField
                        label='Event Rules (JSON)'
                        fullWidth
                        multiline
                        rows={4}
                        value={event.rules}
                        onChange={(e) => handleEventChange(index, 'rules', e.target.value)}
                        margin='normal'
                    />
                </Paper>
            ))}
            <Button variant='contained' color='primary' onClick={addEvent}>
                Add Event
            </Button>
            <Button variant='contained' color='primary' onClick={createTrackingPlan} style={{ marginLeft: '10px' }}>
                Create Tracking Plan
            </Button>
        </Box>
    );
};

export default TrackingPlanForm;
