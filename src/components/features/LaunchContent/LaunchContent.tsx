import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
} from '@mui/material';
import { AddCircle, RemoveCircle, Favorite } from '@mui/icons-material';
import ImageButton from '../../common/ImageButton/ImageButton';
import { Ship, Launch } from '../../../globalTypes';
import { Props, useStyles } from './LaunchContentStyle';

const LaunchContent: React.FC<Props> = (props) => {
  const { id, name, description, images } = props.content;
  const { chosenId } = props;
  const classes = useStyles();
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
  const [isRemoveDisabled, setIsRemoveDisabled] = useState<boolean>(false);

  useEffect(() => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      if (favorites.length >= 10) {
        setIsAddDisabled(true);
      } else {
        const result = favorites.find((item: Launch) => item.id === id);
        setIsAddDisabled(result !== undefined);
        setIsRemoveDisabled(result === undefined);
      }
    }
  }, [chosenId]);

  const removeFromLocalStorageHandling = () => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      favorites = favorites.filter((item: Launch) => item.id !== id);
      localStorage.setItem('launchesStorage', JSON.stringify(favorites));
      setIsAddDisabled(false);
      setIsRemoveDisabled(true);
    }
  };

  const addToLocalStorageHandling = () => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      if (favorites?.length && favorites.length < 10) {
        const result = favorites.find((item: Launch) => item.id === id);
        if (result === undefined) {
          favorites = [
            ...favorites,
            {
              id,
              name,
              description,
              images,
            },
          ];
          localStorage.setItem('launchesStorage', JSON.stringify(favorites));
          setIsAddDisabled(true);
          setIsRemoveDisabled(false);
        }
      } else {
        console.log('Toust');
      }
    } else {
      const preparedData = [
        {
          id,
          name,
          description,
          images,
        },
      ];
      localStorage.setItem('launchesStorage', JSON.stringify(preparedData));
      setIsAddDisabled(true);
      setIsRemoveDisabled(false);
    }
  };

  return (
    <Paper elevation={4} className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          lg={10}
          className={classNames(classes.display, classes.right)}
        >
          {name !== null && name.length ? (
            <Typography variant="h6" textAlign="right">
              {name}
            </Typography>
          ) : (
            <Typography variant="h6" textAlign="center" color="red">
              Name doesn't available
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={2}
          className={classNames(classes.display, classes.center)}
        >
          <Tooltip
            title="Add to favorites"
            arrow
            TransitionComponent={Zoom}
            enterDelay={1000}
          >
            <span>
              <IconButton
                size="small"
                onClick={addToLocalStorageHandling}
                disabled={isAddDisabled}
              >
                <AddCircle color={isAddDisabled ? 'disabled' : 'success'} />
              </IconButton>
            </span>
          </Tooltip>
          <Favorite fontSize="large" color="secondary" />
          <Tooltip
            title="Remove from favorites"
            arrow
            TransitionComponent={Zoom}
            enterDelay={1000}
          >
            <span>
              <IconButton
                size="small"
                onClick={removeFromLocalStorageHandling}
                disabled={isRemoveDisabled}
              >
                <RemoveCircle color={isRemoveDisabled ? 'disabled' : 'error'} />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container className={classes.content}>
        <Grid item xs={12} sm={12} lg={12}>
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
