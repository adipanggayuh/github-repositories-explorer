import { Box, Card, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


export function RepoCardSkeleton() {
  return (
          <Card sx={{marginBottom:'10px'}}>
          <Box sx={{ flexGrow: 1, padding:'12px'}}>
              <Grid container spacing={2}>
                  <Grid size={10}>
                      <Skeleton variant="text" sx={{ fontSize: '2rem', width:'70%' }} />
                  </Grid>
                  <Grid size={2}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                    </Box>
                  </Grid>
                  <Grid size={12}>
                      <Skeleton variant="rectangular" height={30} />
                  </Grid>
              </Grid>
          </Box>
          </Card>
  );
}

export function RepoSectionSkeleton() {
  const cards:any[] = Array.from({ length: 3 });
  return (
          <Grid sx={{padding:'12px'}}>
            {cards.map((_:any,index:number)=>{
              return <RepoCardSkeleton key={'repoSkeleton'+index}/>
            })}
          </Grid>
          
  );
}

export function UserSectionSkeleton() {
  const cards:any[] = Array.from({ length: 5 });
  return (
          <Grid>
            {cards.map((_:any,index:number)=>{
              return <Skeleton key={'userSkeleton'+index} variant="rectangular" height={50} sx={{marginBottom:'10px'}}/>
            })}
          </Grid>
          
  );
}