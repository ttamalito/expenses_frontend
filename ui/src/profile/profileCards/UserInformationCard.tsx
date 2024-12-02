import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { tokens } from "../../theme";
import SelectCurrencyComponent from "./components/SelectCurrencyComponent";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function UserInformationCard() {

    const colors = tokens();

    return (
        <Card variant={'outlined'} sx={{ p: 2, bgcolor: 'background.body', borderRadius: '8px' }}>
            <Box sx={{ mb: 1}}>
                <Typography variant={'h3'}>User Information</Typography>
                <Typography variant={'h5'}>Edit your personal information</Typography>
            </Box>
            <Divider />
            <Stack
                direction={'row'}
                spacing={3}
                sx={{display: {xs: 'none', md: 'flex'}, my: 1}}>
                <Stack direction="column" spacing={1}>
                    {/* PROFILE PICTURE*/}
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ width: 105, height: 105 }} alt="Logo" src="/tamalito.jpg" />
                    </StyledBadge>
                    <IconButton
                        aria-label="upload new picture"
                        size="small"
                        sx={{
                            bgcolor: 'background.body',
                            position: 'absolute',
                            zIndex: 2,
                            borderRadius: '50%',
                            left: 100,
                            top: 170,
                            boxShadow: 'sm',
                        }}
                    >
                        <EditRoundedIcon />
                    </IconButton>
                </Stack> {/* PROFILE PICTURE (STACK) END*/}
                <Stack spacing={2} sx={{flexGrow: 1}}>
                    <Stack spacing={1}>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}
                        >
                            <Input size="small" placeholder="First name"/>
                            <Input size="small" placeholder="Last name" sx={{flexGrow: 1}}/>
                        </FormControl>
                    </Stack> {/* NAME (STACK) END*/}
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size="small" defaultValue="UI Developer"/>
                        </FormControl>
                        <FormControl sx={{flexGrow: 1}}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="small"
                                type="email"
                                // startDecorator={<EmailRoundedIcon />}
                                placeholder="email"
                                defaultValue="siriwatk@test.com"
                                sx={{flexGrow: 1}}
                            />
                        </FormControl>
                    </Stack> {/* ROLE AND EMAIL (STACK) END*/}

                    <Stack direction="row" spacing={2} sx={{flexGrow: 1}}>
                        <SelectCurrencyComponent />
                    </Stack> {/* Select currency for transactions */}


                </Stack> {/* END OF STACK AFTER  PROFILE PICTURE*/}
            </Stack>

            <Divider /> { /* Buttons to save the changes */}
            <Stack direction={'row'} spacing={2} sx={{justifyContent: 'flex-end'}}>
                <Button variant={'outlined'} sx={{ backgroundColor: colors.blueAccent[500]}}>Cancel</Button>
                <Button variant={'contained'} sx={{ backgroundColor: colors.blueAccent[500]}}>Save Changes</Button>

            </Stack>

        </Card> // END OF CARD
    )
}