import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Collapse, Grid, } from '@mui/material';
import { RepoSection } from './RepoSection';
import type { RepositoryObject } from '../interface/interface';
import { RepoSectionSkeleton } from './Skeleton';
import { grey } from '@mui/material/colors';

type UserSectionProps = {
    users: any[],
    handleGetRepos:(url:string)=>void,
    repos: RepositoryObject[],
    loading: boolean
}

const UserSection: React.FC<UserSectionProps> =({users, handleGetRepos, repos, loading})=> {
  /**Local State - start*/
  const [expanded, setExpanded] = useState<string | false>(false);
  /**Local State - end*/

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
      users.map((user:any, index:number)=>{
        return <React.Fragment  key={"user"+index} >
              <Card 
                sx={{marginBottom:'10px',}}
                onClick={()=>handleExpand('panel'+index, user.repos_url)}
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
                        transform: expanded === 'panel'+index? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      />
                    </Grid>
                  </Grid>
                  <Collapse in={expanded === 'panel'+index}>
                  <div style={{padding:'12px'}}>
                    {
                      loading ? <RepoSectionSkeleton/> : <RepoSection repos={repos}/>
                    }
                  </div>
                  </Collapse>
              </Card>
              
          </React.Fragment>
        
      })
    }
    
    </div>
  );
}

export default UserSection;