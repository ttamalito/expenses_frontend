import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { tokens } from "../../../theme";


export default function SelectCurrencyComponent() {
    const colors = tokens();
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    return (
        <FormControl sx={{flexGrow: 1, color: colors.grey[100]}}>
            <FormLabel  sx={{flexGrow: 1, color: colors.grey[100]}}>Currency</FormLabel>

            <Select variant={'standard'}  sx={{flexGrow: 1, color: colors.grey[100]}}>
                {currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency.id}  sx={{flexGrow: 1, color: colors.grey[100]}}>
                        {" (" + currency.symbol + ")" + currency.name + " " + currency.code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}