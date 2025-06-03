import {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getUserByName } from './api/searchApi';
import { Card, CardContent } from '@mui/material';

function App() {
  const [username, setUsername] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const handleChange=(value:string)=>{
    setUsername(value);
    if(isSearchClicked){
      setIsSearchClicked(false);
    }

    if(isFieldEmpty){
      setIsFieldEmpty(false);
    }
  }
  const handleSearch=()=>{
    if(username != ""){

      setIsFieldEmpty(false);

      try {
        getUserByName(username).then((res:any)=>{
          if(res.status == 200){
            setUsers(res.data.items);
          }
          console.log({res});
        }).then((err:any)=>{
          console.log({err});
        })
      } catch (error:any) {
        console.log({error});
      }
      setIsSearchClicked(true);
    }else{
      setIsFieldEmpty(true);
    }
    
  }
  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          >
            <Stack spacing={2}>
              <TextField 
                id="username" 
                variant="outlined" 
                placeholder='Enter username' 
                onChange={(e)=>handleChange(e.target.value)}
                error={isFieldEmpty}
                helperText={isFieldEmpty ? "Please enter username" : ""}
              />
              <Button variant="contained" onClick={handleSearch}>Search</Button>
              {isSearchClicked && <text>Showing users for "{username}"</text>}
            </Stack>
        </Box>
        <Stack spacing={2}>
        {users.slice(0, 5).map(user=>{
          return <Card>
            <CardContent>
              {user.login}
            </CardContent>
            </Card>
        })}
        </Stack>
      </Container>
    </>
  )
}

export default App
