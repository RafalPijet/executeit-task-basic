import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import ListItem from '../../common/ListItem/ListItem';
import { Launch } from '../../../globalTypes';
import { Props, useStyles } from './LaunchesListStyle';

const LaunchesList: React.FC<Props> = (props) => {
  const {
    launches,
    chosenId,
    getChosenId,
    isAvailable,
    isPending,
    isFavorites,
  } = props;
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState<string>(chosenId);

  useEffect(() => {
    setSelectedItem(chosenId);
  }, [chosenId]);

  const chosenListItemHandling = (id: string) => {
    setSelectedItem(id);
    getChosenId(id);
  };

  return (
    <Paper elevation={4} style={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.list}>
            {isAvailable && launches !== null ? (
              launches.map((launch: Omit<Launch, 'description' | 'images'>) => {
                return (
                  <ListItem
                    key={launch.id}
                    id={launch.id}
                    name={launch.name}
                    getItemId={chosenListItemHandling}
                    selectedItem={selectedItem}
                    isPending={isPending}
                  />
                );
              })
            ) : (
              <div className={classes.empty}>
                <Typography variant="h6" color="blue">
                  {isFavorites
                    ? 'Favorites folder is empty'
                    : "The list isn't available"}
                </Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LaunchesList;
