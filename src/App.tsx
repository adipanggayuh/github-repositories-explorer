import {useState} from 'react';
import Container from '@mui/material/Container';
import { getUserByName } from './api/searchApi';
import UserSection from './components/UserSection';
import axios from 'axios';
import type { RepositoryObject } from './interface/interface';
import SearchSection from './components/SearchSection';

function App() {
  /**Local State - Start**/
  const [username, setUsername] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [repos, setRepos] = useState<RepositoryObject[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
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
    setRepos([]);
    setIsUserLoading(true);
    if(username != ""){

      setIsFieldEmpty(false);

      try {
        getUserByName(username).then((res:any)=>{
          if(res.status == 200){
            setUsers(res.data.items.slice(0, 5));
          }
          setIsUserLoading(false);
        }).catch((err:any)=>{
          console.log({err});
          setIsUserLoading(false);
        })
      } catch (error:any) {
        console.log({error});
        setIsUserLoading(false);
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
        {/* Search section */}
        <SearchSection 
           isSearchClicked={isSearchClicked}
            isUserLoading={isUserLoading}
            users={users}
            username={username}
            handleChange={handleChange}
            isFieldEmpty={isFieldEmpty}
            handleSearch={handleSearch}
        />
        {/* user section */}
        <UserSection 
          users={users} 
          handleGetRepos={handleGetRepos} 
          repos={repos} 
          isUserLoading={isUserLoading} 
          isRepoLoading={reposLoading}
        />
      
      </Container>
    </>
  )
}

export default App
