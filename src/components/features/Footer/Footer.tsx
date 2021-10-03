import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  TextField,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import axios, { AxiosResponse } from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import { SelectedLaunch } from '../../../globalTypes';
import { useStyles, Props } from './FooterStyle';

const Footer: React.FC<Props> = (props) => {
  const { getPage, getChosedLaunch, getIsFavorites, isPending } = props;
  const classes = useStyles();
  const [quantity, setQuantity] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [isFavorites, setIsFavorites] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectedLaunch[]>([]);
  const [launchName, setLaunchName] = useState<SelectedLaunch | null>(null);
  const loading = open && options.length === 0;

  useEffect(() => {
    (async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `https://api.spacex.land/rest/launches`
        );
        if (res.data) {
          setQuantity(res.data.length);
        }
      } catch (err: any) {
        console.log(err.response);
      }
    })();
  }, []);

  useEffect(() => {
    getChosedLaunch(launchName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchName]);

  useEffect(() => {
    getIsFavorites(isFavorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorites]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `https://api.spacex.land/rest/launches`
        );
        let names = res.data;
        names = names.map((item: any) => {
          return {
            id: item.id,
            name: item.mission_name,
          };
        });
        if (active && names) {
          setOptions(names);
        }
      } catch (err: any) {
        console.log(err.response);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (!isPending) {
      setPage(newPage);
      getPage(newPage);
    }
  };

  const selectedItemHandling = (
    e: React.ChangeEvent<{}>,
    value: SelectedLaunch | null
  ) => {
    setLaunchName(value);
  };

  const changeSourceHandling = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorites(event.target.checked);
  };

  return (
    <Paper elevation={20} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} lg={4} className={classes.content}>
          <CustomPagination
            quantity={quantity}
            onChangePage={handleChangePage}
            page={page}
            isHidden={launchName !== null || isFavorites}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={2} className={classes.content}>
          <FormControlLabel
            labelPlacement="start"
            disabled={isPending || launchName !== null}
            control={
              <Switch
                color="secondary"
                onChange={changeSourceHandling}
                checked={isFavorites}
              />
            }
            label="API"
          />
          <Favorite
            fontSize="medium"
            color="secondary"
            style={{ paddingLeft: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} className={classes.content}>
          <Autocomplete
            style={{ width: '70%' }}
            disabled={isFavorites || isPending}
            id="searcher"
            open={open}
            size="small"
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={launchName}
            clearText="Remove selection"
            noOptionsText="Not found"
            loadingText="Wait..."
            onChange={selectedItemHandling}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress
                          style={{ color: '#000' }}
                          color="inherit"
                          size={20}
                        />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
