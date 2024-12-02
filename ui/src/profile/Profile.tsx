import React from 'react';
import ProfileHeader from "./ProfileHeader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from '@mui/material/styles';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Button from "@mui/material/Button";
import {tokens } from "../theme";
import CategoryCard from "./profileCards/CategoryCard";
import UserInformationCard from "./profileCards/UserInformationCard";



interface IProfileProps {
    username: string;
}

export default function Profile({ username }: IProfileProps) {
    const colors = tokens();

    const sidePanel = <div>Side Panel</div>;
    const mainContent = <div>Main Content</div>;
    const footer = <div>Footer</div>;
    const header = <div>Header</div>;


    return (
        <div>
            <Box sx={{ flex: 1, width: '100%' }}>
            <ProfileHeader username={username} />

                <Container>
                    <Stack spacing={4} sx={{
                        display: 'flex',
                        maxWidth: '800px',
                        mx: 'auto',
                        px: { xs: 2, md: 6 },
                        py: { xs: 2, md: 3 },
                    }}>
                        <UserInformationCard />


                        <CategoryCard />



                    </Stack>


                </Container>


        </Box> { /*This is the closing tag for the main box component  */ }
        </div>
    );

}