import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Collapse, Grid, } from '@mui/material';
import { RepoSection } from './RepoSection';
import type { RepositoryObject } from '../interface/interface';
import { grey } from '@mui/material/colors';
import { UserSectionSkeleton } from './Skeleton';

/**Component Prop Types */
type UserSectionProps = {
    users: any[],
    handleGetRepos:(url:string)=>void,
    repos: RepositoryObject[],
    isRepoLoading: boolean,
    isUserLoading:boolean,
}
const PANEL:string = 'panel';
const UserSection: React.FC<UserSectionProps> =({users, handleGetRepos, repos, isUserLoading, isRepoLoading})=> {
  /**Local State - start*/
  const [expanded, setExpanded] = useState<string | false>(false);
  /**Local State - end*/

  /**React lifecycle -start*/
  // To close collapse when user search again
  useEffect(()=>{
    setExpanded(false);
  },[isUserLoading])
  /**React lifecycle -end*/

  /**Handler -start*/  
  const handleExpand = (panel: string, reposUrl:string) => {
      let isExpanded:boolean = expanded !== panel; 
      setExpanded(isExpanded ? panel : false);
      if(isExpanded){
        handleGetRepos(reposUrl);
      }
    };
  /**Handler -end*/

  return (
    <div>
    {
      isUserLoading ?
      <UserSectionSkeleton/> :
      users.map((user:any)=>{
        return <React.Fragment key={user.id} >
              <Card 
                sx={{marginBottom:'10px',}}
                onClick={()=>handleExpand(PANEL+user.id, user.repos_url)}
                >
                  <Grid 
                    container 
                    display="flex" 
                    justifyContent="flex-end" 
                    sx={{
                      padding:'12px',
                      backgroundColor:grey[50],
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                          backgroundColor: grey[100],
                          cursor: 'pointer',
                      },
                    }}
                  >
                    <Grid size={10}>
                      <Typography>{user.login}</Typography>
                    </Grid>
                    <Grid size={2} textAlign={'right'}>
                      <ExpandMoreIcon sx={{
                        transition: 'transform 0.3s ease',
                        transform: expanded === PANEL+user.id? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      />
                    </Grid>
                  </Grid>
                  <Collapse in={expanded === PANEL+user.id}>
                    <RepoSection repos={repos} isLoading={isRepoLoading}/>
                  </Collapse>
              </Card>
              
          </React.Fragment>
        
      })
    }
    
    </div>
  );
}

export default UserSection;