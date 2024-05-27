import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box
    component={'footer'}
    sx={{
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
    }}
    >

        <Typography variant='body2'>
            &copy; 2024 Akshay Hebbar. All rights reserved.
        </Typography>
    </Box>
  )
}

export default Footer