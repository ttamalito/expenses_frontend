import React from 'react';
import { Select, Stack, Title } from '@mantine/core';

interface ISelectCurrencyComponentProps {
  selectedCurrency: Currency;
}

export default function SelectCurrencyComponent({
  selectedCurrency,
}: ISelectCurrencyComponentProps) {
  const [currencies] = React.useState<Currency[]>([selectedCurrency]);

  return (
    <Stack style={{ flexGrow: 1 }}>
      <Title order={2}>Currency</Title>

      <Select
        data={currencies.map((currency) => {
          return {
            value: currency.id,
            label: ` (${currency.symbol}) ${currency.name} ${currency.code}`,
            selected: currency.selected,
          };
        })}
        defaultValue={selectedCurrency.id}
        style={{ flexGrow: 1 }}
      />
    </Stack>
  );
}
