import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import expensesTypes from '../../utils/types';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names: string[] = [];
let type: keyof typeof expensesTypes;
for (type in expensesTypes) {
  names.push(expensesTypes[type]);
}

export default function SelectExpenseTypes() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <InputLabel id="demo-multiple-checkbox-label">
        See Expenses of a Type
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        name={'type'}
        size={'medium'}
        //multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="" size={'medium'} />}
        renderValue={(selected) => {
          return selected.join(', ');
        }}
        MenuProps={MenuProps}
      >
        {names.map((name) => {
          return (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} size={'small'} />
              <ListItemText primary={name} />
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
