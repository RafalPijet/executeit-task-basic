import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Props } from './CustomPaginationStyle';

const CustomPagination: React.FC<Props> = (props) => {
  const {
    quantity,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
    isHidden,
    rowsPerPageOptions,
  } = props;
  return (
    <TablePagination
      hidden={isHidden}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={quantity}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
    />
  );
};

export default CustomPagination;
