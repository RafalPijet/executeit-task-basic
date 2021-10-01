import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';
import ListItem from '../../common/ListItem/ListItem';
import { Launch } from '../../../globalTypes';
import { Props } from './LaunchesListStyle';

const LaunchesList: React.FC<Props> = (props) => {
  const { launches, chosenId, getChosenId } = props;
  const [selectedItem, setSelectedItem] = useState<string>(chosenId);

  const chosenListItemHandling = (id: string) => {
    setSelectedItem(id);
    getChosenId(id);
  };

  return (
    <Paper elevation={3}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          {launches.map((launch: Omit<Launch, 'description' | 'images'>) => {
            return (
              <ListItem
                key={launch.id}
                id={launch.id}
                name={launch.name}
                getItemId={chosenListItemHandling}
                selectedItem={selectedItem}
              />
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LaunchesList;
