import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export const Spinner = (): JSX.Element => (
    <Box minHeight='95vh'>
        <Stack direction='column' justifyContent='center' alignItems='center' height='80vh'>
            <Typography variant='h6' gutterBottom>Loading Socket IO...</Typography>
            <CircularProgress />
        </Stack>
    </Box>
);