import React from 'react';
import './mainbtn.css'
import { Button } from '@mui/material';

export default function MainBtn({text}) {
    return (
        <Button className='main-btn' component="label" variant="contained" color='primary'>
            {text}
        </Button>
    )
}