import React from 'react';
import type { RepositoryObject } from '../interface/interface';
import RepoCard from './RepoCard';
import { Grid, Typography } from '@mui/material';
import { RepoSectionSkeleton } from './Skeleton';
import { REPO_NOT_FOUND_MSG } from '../constants/constant';

/**Component Prop Types */
type RepoSectionProps = {
    repos: RepositoryObject[],
    isLoading: boolean
}

export const RepoSection: React.FC<RepoSectionProps> = ({repos,isLoading}) => {

    if(isLoading){
        return <RepoSectionSkeleton/> 
    }
    else {
        return (
            <Grid sx={{padding:'12px'}}>
                { 
                    repos.length ? 
                    repos.map((repo:RepositoryObject,index:number)=>{
                            return <RepoCard key={'repoCard'+index} repo={repo} index={index}/>
                        }) 
                    : <Typography align='center'> {REPO_NOT_FOUND_MSG}</Typography>
                }
            </Grid>
        )
    }
    
}
