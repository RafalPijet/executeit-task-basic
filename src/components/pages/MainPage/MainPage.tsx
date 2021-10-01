import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Paper, Grid } from '@mui/material';
import LaunchesList from '../../features/LaunchesList/LaunchesList';
import LaunchContent from '../../features/LaunchContent/LaunchContent';
import { Launch, Ship } from '../../../globalTypes';
import { useStyles } from './MainPageStyle';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Launch[] | null>(null);
  const [chosenLaunch, setChosenLaunch] = useState<Launch | null>(null);

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
    launch.images.forEach(async (item: Ship) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
      } catch (err: any) {
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
        <Grid container>
          <Grid item xs={12} sm={12} lg={3}>
            {data !== null && chosenLaunch !== null ? (
              <LaunchesList
                chosenId={chosenLaunch.id}
                launches={data}
                getChosenId={chosenItemHandling}
              />
            ) : (
              <p>Null</p>
            )}
          </Grid>
          <Grid item xs={12} sm={12} lg={9}>
            {chosenLaunch !== null ? (
              <LaunchContent content={chosenLaunch} />
            ) : (
              <p>Null content</p>
            )}
            <button onClick={() => console.log(chosenLaunch)}>Click</button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MainPage;
