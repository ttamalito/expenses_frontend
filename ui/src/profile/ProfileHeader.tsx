import React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Typography from "@mui/material/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";
export default function ProfileHeader() {
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <a

                            color="neutral"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </a>
                        <a

                            color="neutral"
                            href="#some-link"
                            // sx={{ fontSize: 12, fontWeight: 500 }}
                        >
                            Users
                        </a>
                        <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                            My profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        My profile
                    </Typography>
                </Box>
                <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                    {/*<TabList*/}
                    {/*    tabFlex={1}*/}
                    {/*    size="sm"*/}
                    {/*    sx={{*/}
                    {/*        pl: { xs: 0, md: 4 },*/}
                    {/*        justifyContent: 'left',*/}
                    {/*        // [`&& .${tabClasses.root}`]: {*/}
                    {/*        //     fontWeight: '600',*/}
                    {/*        //     flex: 'initial',*/}
                    {/*        //     color: 'text.tertiary',*/}
                    {/*        //     [`&.${tabClasses.selected}`]: {*/}
                    {/*        //         bgcolor: 'transparent',*/}
                    {/*        //         color: 'text.primary',*/}
                    {/*        //         '&::after': {*/}
                    {/*        //             height: '2px',*/}
                    {/*        //             bgcolor: 'primary.500',*/}
                    {/*        //         },*/}
                    {/*        //    },*/}
                    {/*        //},*/}
                    {/*    }}*/}
                    {/*>*/}

                            <Typography>Settings</Typography>


                            Team


                            Plan


                            Billing

                    {/*</TabList>*/}
                </Tabs>
            </Box>
        </Box>
    )
}