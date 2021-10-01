import React, { useState, useEffect } from 'react';
import { Paper, Grid, TextField, CircularProgress } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import { SelectedLaunch } from '../../../globalTypes';
import { useStyles } from './FooterStyle';

const Footer: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);
  const [launchName, setLaunchName] = useState<SelectedLaunch | null>(null);
  const loading = open && options.length === 0;

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectedItemHandling = (
    e: React.ChangeEvent<{}>,
    value: SelectedLaunch | null
  ) => {
    setLaunchName(value);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} lg={6} className={classes.content}>
          <CustomPagination
            rowsPerPageOptions={[10]}
            quantity={options.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} className={classes.content}>
          <Autocomplete
            style={{ width: '70%' }}
            // disabled={isUpdating}
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
