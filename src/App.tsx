import { useContext } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import { SocketContext } from './contexts';

// TODO : Create separate components
const App: React.FC = () => {
    const { socket, uid, users } = useContext(SocketContext).socketState;
    return (
        <Container maxWidth='lg'>
            <Box sx={{ m: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography component='h2' variant='h2' fontWeight='bold' gutterBottom>
                    Socket IO Information
                </Typography>
                <Box sx={{ width: 'auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Stack direction='row' spacing={1} padding={1}>
                        <Typography component='p'>Your User ID:</Typography>
                        <Typography component='p' fontWeight='bold'>{uid}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} padding={1}>
                        <Typography component='p'>Users Online:</Typography>
                        <Typography component='p' fontWeight='bold'>{users.length}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} padding={1}>
                        <Typography component='p'>Socket ID:</Typography>
                        <Typography component='p' fontWeight='bold'>{socket?.id}</Typography>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default App;
