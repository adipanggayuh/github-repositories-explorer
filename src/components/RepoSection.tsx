import React from 'react';
import type { RepositoryObject } from '../interface/interface';
import RepoCard from './RepoCard';
import { Grid } from '@mui/material';
type RepoSectionProps = {
    repos: RepositoryObject[],
}

export const RepoSection: React.FC<RepoSectionProps> = ({repos}) => {
  return (
   <Grid sx={{padding:'12px'}}>
     {
        repos.map((repo:RepositoryObject,index:number)=>{
            return <RepoCard key={'repoCard'+index} repo={repo} index={index}/>
        })
    }
    </Grid>
  )
}
