import React from "react";
import { tokens } from "../../../theme";
import IncomeCategory from "../../../models/IncomeCategory";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

export default function SelectAndRemoveIncomeCategory() {
    const colors = tokens();
    const [categories, setCategories] = React.useState<IncomeCategory[]>([]);
    return (
        <Box>
            <Stack spacing={1}>
                <FormControl>
                    <FormLabel>Select category to remove</FormLabel>
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
                    <Input size="small" placeholder="Category Name" name={'name'} disabled={true} value={'Change with onChange'}/>
                    <Input size="medium" placeholder="Description" sx={{flexGrow: 1}} name={'description'} disabled={true} value={'Change with onChange'}/>
                </FormControl>
            </Stack> {/* Category name (STACK) END*/}
            <Stack direction="row" spacing={2}>
            </Stack> {/* Type of transaction and budget stack*/}
        </Box>
    );
}