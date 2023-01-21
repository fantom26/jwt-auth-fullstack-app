import { ChangeEvent, FC, MouseEvent, useContext, useState } from "react";

import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Context } from "index";
import { getFullName } from "utils/helpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export const UsersTable: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { store } = useContext(Context);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Activated account</StyledTableCell>
              <StyledTableCell>First name</StyledTableCell>
              <StyledTableCell>Last name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? store.usersStore.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : store.usersStore.users).map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  <Checkbox color="info" disabled checked={user.isActivated} />
                </StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{getFullName(user.firstName, user.lastName)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={store.usersStore.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          component="div"
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page"
            },
            native: true
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};
