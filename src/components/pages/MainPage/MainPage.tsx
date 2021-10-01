import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Paper from '@mui/material/Paper';
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
    const prepareImages = () => {
      if (data !== null) {
        let shipImages: Ship[] = [];
        data[0].images.forEach(async (item: Ship) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 300));
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
              name: data[0].name,
              description: data[0].description,
              images: shipImages,
            });
          } catch (err: any) {
            console.log(err.response);
          }
        });
      }
    };
    prepareImages();
  }, [data]);

  const test = () => {
    console.log(chosenLaunch);
  };

  return (
    <div className={classes.container}>
      <Paper elevation={8}>
        App<button onClick={test}>Click me</button>
      </Paper>
    </div>
  );
};

export default MainPage;
