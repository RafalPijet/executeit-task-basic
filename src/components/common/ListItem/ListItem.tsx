import React from 'react';
import ClassName from 'classnames';
import { Paper, Typography } from '@mui/material';
import { cutText } from '../../../functions';
import { Props, useStyles } from './ListItemStyle';

const ListItem: React.FC<Props> = (props) => {
  const { id, name, getItemId, selectedItem, isPending } = props;
  const classes = useStyles();
  const rootClasses = ClassName({
    [classes.selected]: selectedItem === id,
    [classes.root]: true,
    [classes.pending]: isPending,
  });

  const sendItemIdHandling = () => {
    if (!isPending) {
      getItemId(id);
    }
  };

  return (
    <Paper
      className={rootClasses}
      elevation={selectedItem === id ? 2 : 8}
      onClick={sendItemIdHandling}
    >
      <Typography>{cutText(name, 25)}</Typography>
    </Paper>
  );
};

export default ListItem;
