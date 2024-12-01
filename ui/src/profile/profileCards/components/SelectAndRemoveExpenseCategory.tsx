import React from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import { tokens } from "../../../theme";
import MenuItem from "@mui/material/MenuItem";


export default function SelectAndRemoveExpenseCategory() {
    const colors = tokens();

    const [categories, setCategories] = React.useState<ExpenseCategory[]>([]);


    return (

        <Box>
            <Stack spacing={1}>
                <FormControl>
                    <FormLabel>Select category to Remove</FormLabel>
                    <Select variant={'standard'}>

                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id} sx={{color: colors.grey[100]}}>
                                {category.name}
                            </MenuItem>
                        ))
                        }

                    </Select>
                </FormControl>
            </Stack>

            <Stack spacing={1}>
                <FormLabel>Category Name</FormLabel>
                <FormControl
                    sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}
                >
                    <Input size="small" placeholder="Category Name" name={'name'} disabled={true} value={'Add with with onChange'}/>
                    <Input size="medium" placeholder="Description" sx={{flexGrow: 1}} name={'description'} disabled={true} value={'add with onChange'} />
                </FormControl>
            </Stack> {/* Category name (STACK) END*/}
        </Box>

    );
}