import React from 'react';
import AppAppBar from './marketing-page/components/AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import Features from './marketing-page/components/Features';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function LandingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Features />
        <Divider />
      </AppTheme>
    </>
  );
}
