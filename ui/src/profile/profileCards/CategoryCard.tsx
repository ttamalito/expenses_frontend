import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import { tokens } from "../../theme";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {SpaceBar} from "@mui/icons-material";
import SelectAndEditExpenseCategory from "./components/SelectAndEditExpenseCategory";
import SelectAndRemoveExpenseCategory from "./components/SelectAndRemoveExpenseCategory";


export default function CategoryCard() {
    const colors = tokens();


    return (
        <Card variant={'outlined'} sx={{ p: 2, bgcolor: 'background.body', borderRadius: '8px' }}>
            <Box sx={{ mb: 1}}>
                <Typography variant={'h3'}>User categories</Typography>
                <Typography variant={'h5'}>Add category for transactions</Typography>
            </Box>
            <Divider />
            <Stack
                direction={'row'}
                spacing={3}
                sx={{display: {xs: 'none', md: 'flex'}, my: 1}}>
                {/*<Stack direction="column" spacing={1}>*/}
                {/*    /!* PROFILE PICTURE*!/*/}
                {/*    /!*<StyledBadge*!/*/}
                {/*    /!*    overlap="circular"*!/*/}
                {/*    /!*    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}*!/*/}
                {/*    /!*    variant="dot"*!/*/}
                {/*    /!*>*!/*/}
                {/*    /!*    <Avatar sx={{ width: 105, height: 105 }} alt="Logo" src="/tamalito.jpg" />*!/*/}
                {/*    /!* </StyledBadge> *!/*/}
                {/*    <IconButton*/}
                {/*        aria-label="upload new picture"*/}
                {/*        size="small"*/}
                {/*        sx={{*/}
                {/*            bgcolor: 'background.body',*/}
                {/*            position: 'absolute',*/}
                {/*            zIndex: 2,*/}
                {/*            borderRadius: '50%',*/}
                {/*            left: 100,*/}
                {/*            top: 170,*/}
                {/*            boxShadow: 'sm',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <EditRoundedIcon />*/}
                {/*    </IconButton>*/}
                {/*</Stack> /!* PROFILE PICTURE (STACK) END*!/*/}
                <Stack spacing={2} sx={{flexGrow: 1}}>
                    <Stack spacing={1}>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl
                            sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}
                        >
                            <Input size="small" placeholder="Category Name" name={'name'}/>
                            <Input size="medium" placeholder="Description" sx={{flexGrow: 1}} name={'description'}/>
                        </FormControl>
                    </Stack> {/* NAME (STACK) END*/}
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <FormLabel>Transaction</FormLabel>
                            <RadioGroup
                                row
                                name={'transaction'}
                            >
                                <FormControlLabel value="expense" control={<Radio/>} label="Expense"/>
                                <FormControlLabel value="income" control={<Radio/>} label="Income"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl sx={{flexGrow: 1}}>
                            <FormLabel>Budget</FormLabel>
                            <Input
                                size="small"
                                type="number"
                                // startDecorator={<EmailRoundedIcon />}
                                placeholder="Budget for category"
                                defaultValue="0"
                                sx={{flexGrow: 1, color: colors.grey[100]}}
                            />
                        </FormControl>
                    </Stack> {/* Type of transaction and budget stack*/}

                </Stack> {/* END OF STACK after all*/}
            </Stack>

            <Divider /> { /* Buttons to save the changes */}
            <br/>
            <Stack direction={'row'} spacing={2} sx={{justifyContent: 'flex-end'}}>
                <Button variant={'outlined'} sx={{ backgroundColor: colors.blueAccent[500]}}>Cancel</Button>
                <Button variant={'contained'} sx={{ backgroundColor: colors.blueAccent[500]}}>Create Category</Button>
            </Stack>

            <Divider> Edit Category </Divider>


            <Box sx={{ mb: 1}}>
                <Typography variant={'h3'}>Edit categories</Typography>
                <Typography variant={'h5'}>Select category to edit</Typography>
            </Box>
            <Divider />
            <Stack
                direction={'row'}
                spacing={3}
                sx={{display: {xs: 'none', md: 'flex'}, my: 1}}>
                <Stack spacing={2} sx={{flexGrow: 1}}>
                    <Stack spacing={1}>
                        <FormControl>
                            <FormLabel>Edit Expense or Income category</FormLabel>
                            <RadioGroup
                                row
                                name={'categoryType'}
                            >
                                <FormControlLabel value="expense" control={<Radio/>} label="Expense"/>
                                <FormControlLabel value="income" control={<Radio/>} label="Income"/>
                            </RadioGroup>
                        </FormControl>
                        <SelectAndEditExpenseCategory />
                    </Stack>
                </Stack> {/* END OF STACK after all*/}
            </Stack>

            <Divider /> { /* Buttons to save the changes */}
            <br/>
            <Stack direction={'row'} spacing={2} sx={{justifyContent: 'flex-end'}}>
                <Button variant={'outlined'} sx={{ backgroundColor: colors.blueAccent[500]}}>Cancel</Button>
                <Button variant={'contained'} sx={{ backgroundColor: colors.blueAccent[500]}}>Edit Category</Button>
            </Stack>

            <Divider>Remove Category</Divider>

            <Box sx={{ mb: 1}}>
                <Typography variant={'h3'}>Remove categories</Typography>
                <Typography variant={'h5'}>Select category to remove</Typography>
            </Box>
            <Divider />
            <Stack
                direction={'row'}
                spacing={3}
                sx={{display: {xs: 'none', md: 'flex'}, my: 1}}>
                <Stack spacing={2} sx={{flexGrow: 1}}>
                    <Stack spacing={1}>
                        <FormControl>
                            <FormLabel>Edit Expense or Income category</FormLabel>
                            <RadioGroup
                                row
                                name={'categoryType'}
                            >
                                <FormControlLabel value="expense" control={<Radio/>} label="Expense"/>
                                <FormControlLabel value="income" control={<Radio/>} label="Income"/>
                            </RadioGroup>
                        </FormControl>
                        <SelectAndRemoveExpenseCategory />
                    </Stack>

                </Stack> {/* END OF STACK after all*/}
            </Stack>

            <Divider /> { /* Buttons to save the changes */}
            <br/>
            <Stack direction={'row'} spacing={2} sx={{justifyContent: 'flex-end'}}>
                <Button variant={'outlined'} sx={{ backgroundColor: colors.blueAccent[500]}}>Cancel</Button>
                <Button variant={'contained'} sx={{ backgroundColor: colors.blueAccent[500]}}>Remove Category</Button>
            </Stack>



        </Card>
    )
}