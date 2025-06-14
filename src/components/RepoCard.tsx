
import Typography from '@mui/material/Typography';
import type { RepositoryObject } from '../interface/interface';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { grey, orange } from '@mui/material/colors';
import { Card } from '@mui/material';
import { NO_DESCRIPTION } from '../constants/constant';

/**Component Prop Types */
type RepoCardProps = {
    repo: RepositoryObject
}

const RepoCard: React.FC<RepoCardProps> = ({repo}) => {
  return (
    <Card 
        key={repo.id} 
        sx={{
            marginBottom:'10px', 
            padding:'12px', 
            backgroundColor:grey[100],
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: grey[200],
                cursor: 'pointer',
            },
        }}
    >
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <Typography component="span" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {repo.name}
                    </Typography>
                </Grid>
                <Grid size={2}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Typography>{repo.stargazers_count} </Typography>
                        {repo.stargazers_count ? <StarIcon sx={{ color: orange[500] }}/> : <StarBorderIcon/>}
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                        {repo.description || NO_DESCRIPTION}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Card>
  )
}

export default RepoCard