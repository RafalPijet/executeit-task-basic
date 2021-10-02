import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { AddCircle, RemoveCircle, Favorite } from '@mui/icons-material';
import ImageButton from '../../common/ImageButton/ImageButton';
import { Ship } from '../../../globalTypes';
import { Props, useStyles } from './LaunchContentStyle';

const LaunchContent: React.FC<Props> = (props) => {
  const { name, description, images } = props.content;
  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item xs={12} sm={12} lg={12}>
          {name !== null && name.length ? (
            <Typography variant="h6" textAlign="center">
              {name}
            </Typography>
          ) : (
            <Typography variant="h6" textAlign="center" color="red">
              Name doesn't available
            </Typography>
          )}

          {description !== null && description.length ? (
            <Typography>{description}</Typography>
          ) : (
            <Typography textAlign="center" color="red">
              Description doesn't available
            </Typography>
          )}

          <div className={classes.buttonList}>
            {images !== null && images.length ? (
              images.map((ship: Ship) => {
                return (
                  <ImageButton key={`${ship.id}-${ship.name}`} ship={ship} />
                );
              })
            ) : (
              <Typography textAlign="center" color="red">
                Images aren't available
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LaunchContent;
