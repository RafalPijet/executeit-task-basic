import React, { useState } from 'react';
import ClassName from 'classnames';
import { Paper, Typography } from '@mui/material';
import { cutText } from '../../../functions';
import { Props, useStyles } from './ListItemStyle';

const ListItem: React.FC<Props> = (props) => {
  const { id, name, getItemId, selectedItem } = props;
  const classes = useStyles();
  const [itemId, setItemId] = useState<string>(id);
  const rootClasses = ClassName({
    [classes.selected]: selectedItem === itemId,
    [classes.root]: true,
  });

  return (
    <Paper
      className={rootClasses}
      elevation={selectedItem === itemId ? 2 : 8}
      onClick={() => getItemId(itemId)}
    >
      <Typography>{cutText(name, 25)}</Typography>
    </Paper>
  );
};

export default ListItem;
