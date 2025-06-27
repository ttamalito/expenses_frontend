import { goToLink } from '../utils/goToLinkFromForm';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

export default function GoToYearlySummaryForm() {
  const yearlySummary = (
    <form
      onSubmit={(event) => {
        goToLink(event, 'year', 'summary');
      }}
    >
      <FormControl>
        <FormLabel htmlFor={'year'}>
          <Typography>
            <Typography variant={'h3'}>Go To Yearly Summary</Typography>
          </Typography>
        </FormLabel>
        <br />
        <input type="number" placeholder={'year'} id={'year'} name={'year'} />
      </FormControl>
      <Button type={'submit'} variant={'contained'}>
        {' '}
        Go to Summary
      </Button>
    </form>
  );

  return <>{yearlySummary}</>;
}
