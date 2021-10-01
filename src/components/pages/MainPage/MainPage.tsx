import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Paper, Grid, CircularProgress } from '@mui/material';
import LaunchesList from '../../features/LaunchesList/LaunchesList';
import LaunchContent from '../../features/LaunchContent/LaunchContent';
import Footer from '../../features/Footer/Footer';
import { Launch, Ship } from '../../../globalTypes';
import { useStyles } from './MainPageStyle';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Launch[] | null>(null);
  const [chosenLaunch, setChosenLaunch] = useState<Launch | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const prepareData = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          'https://api.spacex.land/rest/launches?limit=10&offset=10'
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

        console.log('End');
      } catch (err: any) {
        console.log(err.response);
        console.log('Error');
      }
    };
    prepareData();
  }, []);

  useEffect(() => {
    if (data !== null) {
      prepareImages(data[0]);
    }
  }, [data]);

  const prepareImages = (launch: Launch) => {
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
  };

  const chosenItemHandling = (id: string) => {
    if (data !== null) {
      const result = data.find((item: Launch) => item.id === id);
      if (result) {
        prepareImages(result);
      }
    }
    console.log(id);
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3}>
        <Grid container style={{ minHeight: 640 }}>
          <Grid item xs={12} sm={12} lg={3} className={classes.content}>
            {data !== null && chosenLaunch !== null ? (
              <LaunchesList
                chosenId={chosenLaunch.id}
                launches={data}
                getChosenId={chosenItemHandling}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={12} sm={12} lg={9} className={classes.content}>
            {isPending || chosenLaunch === null ? (
              <CircularProgress />
            ) : (
              <LaunchContent content={chosenLaunch} />
            )}
            {/* <button onClick={() => console.log(chosenLaunch)}>Click</button> */}
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Footer />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MainPage;
