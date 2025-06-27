import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

interface ISelectCurrencyComponentProps {
  selectedCurrency: Currency;
}

export default function SelectCurrencyComponent({
  selectedCurrency,
}: ISelectCurrencyComponentProps) {
  const [currencies, setCurrencies] = React.useState<Currency[]>([
    selectedCurrency,
  ]);

  return (
    <FormControl sx={{ flexGrow: 1 }}>
      <FormLabel sx={{ flexGrow: 1 }}>
        <Typography variant={'h2'}>Currency</Typography>
      </FormLabel>

      <Select
        variant={'standard'}
        sx={{ flexGrow: 1 }}
      >
        {currencies.map((currency) => {
          return (
            <MenuItem
              key={currency.id}
              value={currency.id}
              sx={{ flexGrow: 1 }}
              selected={currency.selected}
            >
              {' (' +
                currency.symbol +
                ') ' +
                currency.name +
                ' ' +
                currency.code}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
