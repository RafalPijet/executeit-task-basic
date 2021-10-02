import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Props } from './CustomPaginationStyle';

const CustomPagination: React.FC<Props> = (props) => {
  const { quantity, page, onChangePage, isHidden } = props;
  return (
    <TablePagination
      hidden={isHidden}
      rowsPerPageOptions={[10]}
      component="div"
      count={quantity}
      rowsPerPage={10}
      page={page}
      onPageChange={onChangePage}
    />
  );
};

export default CustomPagination;
