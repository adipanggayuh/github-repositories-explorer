import React from 'react';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { grey } from '@mui/material/colors';
import { SEARCH_HELPER_TEXT, USER_NOT_FOUND_MSG } from '../constants/constant';

/**Component Prop Types */
type SearchSectionProps = {
    isSearchClicked:boolean,
    isUserLoading:boolean,
    users:any[],
    username:string,
    handleChange:(value:string)=>void,
    isFieldEmpty:boolean,
    handleSearch:()=>void,
}

const SearchSection :React.FC<SearchSectionProps> = ({
    isSearchClicked,
    isUserLoading,
    users,
    username,
    handleChange,
    isFieldEmpty,
    handleSearch,
}) => {


    /**Handler - start */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
        }
    };
    /**Handler - end */

    /**Render Sub-Component - start*/
    const renderShowResultMessage=()=>{
        return isSearchClicked && !isUserLoading && users.length ? 
        <Typography>Showing users for "{username}"</Typography> : <></>
    }

    const renderNotFoundMessage=()=>{
        return isSearchClicked && !isUserLoading && !users.length ? 
        <Stack alignItems={"center"}> 
            <SentimentVeryDissatisfiedIcon sx={{fontSize:100, color:grey[400]}}/>
            <Typography variant='h5' color='textDisabled' >{USER_NOT_FOUND_MSG}</Typography>
        </Stack> 
        : <></>
    }
  /**Render Sub-Component - end*/

    return (
        <Box style={{marginBottom:'10px'}}>
                <Stack spacing={2}>
                <TextField 
                    id="username" 
                    variant="outlined" 
                    placeholder='Enter username' 
                    onChange={(e)=>handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    error={isFieldEmpty}
                    helperText={isFieldEmpty ? SEARCH_HELPER_TEXT : ""}
                />
                <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon/>}>Search</Button>
                {renderShowResultMessage()}
                {renderNotFoundMessage()}
                </Stack>
            </Box>
    )
}

export default SearchSection;