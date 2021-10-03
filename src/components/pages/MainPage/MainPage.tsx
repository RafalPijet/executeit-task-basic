import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { Paper, Grid, CircularProgress, Typography } from '@mui/material';
import LaunchesList from '../../features/LaunchesList/LaunchesList';
import LaunchContent from '../../features/LaunchContent/LaunchContent';
import Footer from '../../features/Footer/Footer';
import { Launch, Ship, SelectedLaunch } from '../../../globalTypes';
import { useStyles } from './MainPageStyle';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Launch[] | null>(null);
  const [favoritesData, setFavoritesData] = useState<Launch[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [chosenLaunch, setChosenLaunch] = useState<Launch | null>(null);
  const [foundLaunch, setFoundLaunch] = useState<SelectedLaunch | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  useEffect(() => {
    const prepareData = async () => {
      try {
        setIsPending(true);
        const res: AxiosResponse = await axios.get(
          `https://api.spacex.land/rest/launches?limit=10&offset=${page * 10}`
        );
        if (res.data) {
          const result = res.data.map((item: any) => {
            return {
              id: item.id,
              name: item.mission_name,
              description: item.details,
              images: item.ships,
            };
          });
          setData(result);
          setIsPending(false);
        }
      } catch (err: any) {
        console.log(err.response);
        console.log('Error');
        setIsPending(false);
      }
    };
    if (foundLaunch === null) {
      prepareData();
    }
  }, [page, foundLaunch]);

  useEffect(() => {
    if (data !== null) {
      prepareImages(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (foundLaunch !== null) {
      (async () => {
        try {
          setIsPending(true);
          const res: AxiosResponse = await axios.get(
            `https://api.spacex.land/rest/launches?find={"mission_name": "${foundLaunch.name}"}`
          );
          if (res.data.length) {
            const result = res.data.map((item: any) => {
              return {
                id: item.id,
                name: item.mission_name,
                description: item.details,
                images: item.ships,
              };
            });
            setData(result);
            setIsPending(false);
          }
        } catch (err: any) {
          setIsPending(false);
          console.log(err.response);
          console.log('Error');
        }
      })();
    }
  }, [foundLaunch]);

  useEffect(() => {
    if (isFavorites) {
      const stringFavorites = localStorage.getItem('launchesStorage');
      if (stringFavorites !== null) {
        let favorites: Launch[] = JSON.parse(stringFavorites);
        if (favorites.length) {
          setFavoritesData(favorites);
          setChosenLaunch(favorites[0]);
        } else {
          setFavoritesData(null);
          setChosenLaunch(null);
        }
      }
      if (isFavorites && stringFavorites === null) {
        setChosenLaunch(null);
      }
    } else {
      if (data !== null) {
        prepareImages(data[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorites]);

  const prepareImages = (launch: Launch) => {
    if (launch.images.length) {
      let shipImages: Ship[] = [];
      setIsPending(true);
      launch.images.forEach(async (item: Ship) => {
        try {
          const res: AxiosResponse = await axios.get(
            `https://api.spacex.land/rest/ship/${item.id}`
          );
          const result = {
            id: item.id,
            name: res.data.name,
            image: res.data.image,
          };
          shipImages = [...shipImages, result];
          setChosenLaunch({
            id: launch.id,
            name: launch.name,
            description: launch.description,
            images: shipImages,
          });
          setIsPending(false);
        } catch (err: any) {
          setIsPending(false);
          console.log(err.response);
        }
      });
    } else {
      setChosenLaunch({
        id: launch.id,
        name: launch.name,
        description: launch.description,
        images: [],
      });
    }
  };

  const chosenItemHandling = (id: string) => {
    if (isFavorites) {
      if (favoritesData !== null) {
        const selectedItem = favoritesData?.find(
          (item: Launch) => item.id === id
        );
        if (selectedItem) {
          setChosenLaunch(selectedItem);
        }
      }
    } else {
      if (data !== null) {
        const result = data.find((item: Launch) => item.id === id);
        if (result) {
          prepareImages(result);
        }
      }
    }
  };

  const changePageHandling = (page: number) => {
    setPage(page);
    setData(null);
  };

  const chosenLaunchHandling = (item: SelectedLaunch | null) => {
    setFoundLaunch(item);
  };

  const changeFavoritesHandling = (isFavorites: boolean) => {
    setIsFavorites(isFavorites);
  };

  const removeItemFromFavoritesHandling = (id: string) => {
    if (favoritesData !== null) {
      let favorites = [...favoritesData];
      favorites = favorites.filter((item: Launch) => item.id !== id);
      setFavoritesData(favorites);
      if (favorites.length) {
        setChosenLaunch(favorites[0]);
      } else {
        setFavoritesData(null);
        setChosenLaunch(null);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            style={{ minHeight: 660 }}
            className={classes.content}
          >
            {data !== null ? (
              <LaunchesList
                isAvailable={foundLaunch === null}
                chosenId={chosenLaunch !== null ? chosenLaunch.id : ''}
                launches={isFavorites ? favoritesData : data}
                getChosenId={chosenItemHandling}
                isPending={isPending}
                isFavorites={isFavorites}
              />
            ) : (
              <div className={classNames(classes.content, classes.center)}>
                <CircularProgress color="warning" />
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={9}
            className={classNames(classes.content, classes.center)}
          >
            {isPending ? (
              <CircularProgress />
            ) : chosenLaunch === null ? (
              <Paper elevation={4} className={classes.nothing}>
                <Typography variant="h6" color="blue">
                  Nothing to show
                </Typography>
              </Paper>
            ) : (
              <LaunchContent
                content={chosenLaunch}
                chosenId={chosenLaunch.id}
                getRemovedId={removeItemFromFavoritesHandling}
                isFavorites={isFavorites}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Footer
              getPage={changePageHandling}
              getChosedLaunch={chosenLaunchHandling}
              getIsFavorites={changeFavoritesHandling}
              isPending={isPending}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MainPage;
