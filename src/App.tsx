import {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getUserByName } from './api/searchApi';
import SearchIcon from '@mui/icons-material/Search';
import UserSection from './components/UserSection';
import axios from 'axios';
import type { RepositoryObject } from './interface/interface';
import { UserSectionSkeleton } from './components/Skeleton';

function App() {
  /**Local State - Start**/
  const [username, setUsername] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [repos, setRepos] = useState<RepositoryObject[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  /**Local State - End**/

  /**Handler - Start**/
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
    setLoading(true);
    if(username != ""){

      setIsFieldEmpty(false);

      try {
        getUserByName(username).then((res:any)=>{
          if(res.status == 200){
            setUsers(res.data.items.slice(0, 5));
          }
          console.log({res});
          setLoading(false);
        }).then((err:any)=>{
          console.log({err});
          setLoading(false);
        })
      } catch (error:any) {
        console.log({error});
        setLoading(false);
      }
      setIsSearchClicked(true);
    }else{
      setIsFieldEmpty(true);
    }
    
  }

  const handleGetRepos=(url:string)=>{
    setRepos([]);
    setReposLoading(true);
    try {
      axios.get(url).then((res:any)=>{
        if(res.status == 200){
            setRepos(res.data.slice(0,3));
        }
        setReposLoading(false);
      }).catch((err:any)=>{
        console.log({err});
        setReposLoading(false);
      })
    } catch (error) {
      console.log(error);
      setReposLoading(false);
    }
    
  }
  /**Handler - End**/

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          style={{marginBottom:'10px'}}
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
              <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon/>}>Search</Button>
              {isSearchClicked && !loading && <label>Showing users for "{username}"</label>}
            </Stack>
        </Box>
        {
          loading ? <UserSectionSkeleton/> : <UserSection users={users} handleGetRepos={handleGetRepos} repos={repos} loading={reposLoading}/>
        }
        
      </Container>
    </>
  )
}

export default App
