import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'Mensal',
    label: 'Mensal',
  },
  {
    value: 'Trimestral',
    label: 'Trimestral',
  },
  {
    value: 'Anual',
    label: 'Anual',
  },
  {
    value: 'Semanal',
    label: 'Semanal',
  },
  {
    value: 'Diário',
    label: 'Diário',
  },
 
];

export default function Select() {
  return (
    <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { marginBottom: '15px', width: '22ch', marginTop: '4px' },
        '& .MuiInputBase-root': {height: '45px'} 
      }}
      noValidate
      autoComplete="on"
    >
      <div  >
        <TextField 
          id="outlined-select-currency"
          select
          label="Periodo"
          defaultValue="EUR"
        >
          {currencies.map((option) => (
            <MenuItem  key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
     
    </Box>
  );
}
