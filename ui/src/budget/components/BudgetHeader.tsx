import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IBudgetHeaderProps {
  totalBudget: number;
}

export default function BudgetHeader({ totalBudget }: IBudgetHeaderProps) {
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
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {'Monthly Budget: ' + totalBudget}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
