import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';
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
import image from '../../../images/noImage.png';
import { Props, useStyles } from './LaunchContentStyle';

const LaunchContent: React.FC<Props> = (props) => {
  const { id, name, description, images } = props.content;
  const { chosenId, getRemovedId, isFavorites } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
  const [isRemoveDisabled, setIsRemoveDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsRemoveDisabled(!isFavorites);
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      const result = favorites.find((item: Launch) => item.id === id);
      favorites.length >= 10
        ? setIsAddDisabled(true)
        : setIsAddDisabled(result !== undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenId, isFavorites]);

  const removeFromLocalStorageHandling = () => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      favorites = favorites.filter((item: Launch) => item.id !== id);
      localStorage.setItem('launchesStorage', JSON.stringify(favorites));
      setIsAddDisabled(false);
      setIsRemoveDisabled(true);
      getRemovedId(id);
    }
  };

  const addToLocalStorageHandling = () => {
    const stringFavorites = localStorage.getItem('launchesStorage');
    if (stringFavorites !== null) {
      let favorites: Launch[] = JSON.parse(stringFavorites);
      if (favorites.length < 10) {
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
          if (favorites.length === 10) {
            enqueueSnackbar(
              'You have reached the maximum number of 10 items in the FAVORITES folder',
              { variant: 'info' }
            );
          }
        }
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
          {!isFavorites && (
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
          )}
          <Favorite fontSize="large" color="secondary" />
          {isFavorites && (
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
                  <RemoveCircle
                    color={isRemoveDisabled ? 'disabled' : 'error'}
                  />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.content}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          {description !== null && description.length ? (
            <Typography textAlign="center">{description}</Typography>
          ) : (
            <Typography textAlign="center" color="red">
              Description doesn't available
            </Typography>
          )}

          <div className={classes.buttonList}>
            {images !== null && images.length ? (
              images.map((ship: Ship, index) => {
                return <ImageButton key={`${ship.id}-${index}`} ship={ship} />;
              })
            ) : (
              <img src={image} alt="no-content" />
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LaunchContent;
