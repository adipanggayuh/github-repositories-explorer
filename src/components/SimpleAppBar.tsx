import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SimpleAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom:'15px' }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt="icon" src='/icon_search.png'/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:'center' }}>
            Github Repositories Exploler
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
