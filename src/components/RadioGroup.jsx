import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Book Search Options</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Name" />
        <FormControlLabel value="male" control={<Radio />} label="Author" />
        <FormControlLabel value="other" control={<Radio />} label="Publisher" />
        <FormControlLabel value="other" control={<Radio />} label="Publish Year" />
      </RadioGroup>
    </FormControl>
  );
}