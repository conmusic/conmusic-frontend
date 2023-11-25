import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Pagina() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="secondary" size='large' 
      sx={{margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
    </Stack>
  );
}