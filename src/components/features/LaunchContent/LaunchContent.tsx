import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import ImageButton from '../../common/ImageButton/ImageButton';
import { Ship } from '../../../globalTypes';
import { Props, useStyles } from './LaunchContentStyle';

const LaunchContent: React.FC<Props> = (props) => {
  const { id, name, description, images } = props.content;
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
          <div className={classes.buttonList}>
            {images.map((ship: Ship) => {
              return <ImageButton key={ship.id} ship={ship} />;
            })}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LaunchContent;
