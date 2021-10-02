import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { Paper, Grid, CircularProgress } from '@mui/material';
import LaunchesList from '../../features/LaunchesList/LaunchesList';
import LaunchContent from '../../features/LaunchContent/LaunchContent';
import Footer from '../../features/Footer/Footer';
import { Launch, Ship, SelectedLaunch } from '../../../globalTypes';
import { useStyles } from './MainPageStyle';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Launch[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [chosenLaunch, setChosenLaunch] = useState<Launch | null>(null);
  const [foundLaunch, setFoundLaunch] = useState<SelectedLaunch | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const prepareData = async () => {
      try {
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
        }
      } catch (err: any) {
        console.log(err.response);
        console.log('Error');
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

  const prepareImages = (launch: Launch) => {
    if (launch.images.length) {
      let shipImages: Ship[] = [];
      setIsPending(true);
      launch.images.forEach(async (item: Ship) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 800));
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
    if (data !== null) {
      const result = data.find((item: Launch) => item.id === id);
      if (result) {
        prepareImages(result);
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
            {data !== null && chosenLaunch !== null ? (
              <LaunchesList
                isAvailable={foundLaunch === null}
                chosenId={chosenLaunch.id}
                launches={data}
                getChosenId={chosenItemHandling}
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
            {isPending || chosenLaunch === null ? (
              <CircularProgress />
            ) : (
              <LaunchContent content={chosenLaunch} />
            )}
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Footer
              getPage={changePageHandling}
              getChosedLaunch={chosenLaunchHandling}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MainPage;
