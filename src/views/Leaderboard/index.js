// import React, { Component } from 'react';

// //mui

// import './leaderboard.css'
// import '../../index.css'

// export class Leaderboard extends Component {
//          state = {
//            games: []
//          };

//          fetchGames = () => {
//            fetch("http://localhost:3000/api/v1/games")
//              .then(res => res.json())
//              .then(games => {
//                console.log(games);

//                this.setState({ games });
//              });
//          };
//          componentDidMount() {
//            this.fetchGames()
//          }
//          render() {
//            console.log(this.state.games);

//            return (
//              <div className={'leaderboard__container'}>
//                <ol>
//                {this.state.games.map(game => (
//                    <li key={game.id}>{game.user_id}</li>
//                    ))}
//                    </ol>
//              </div>
//            );
//          }
//        }

// export default Leaderboard;

// ++++++++++++++++++++++++
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 170 },
  { id: 'user', label: 'Username', minWidth: 100 },
  {
    id: 'clicks',
    label: 'Clicks',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'time',
    label: 'Time (seconds)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'score',
    label: 'Score',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
];






function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  fetch("http://localhost:3000/api/v1/games")
    .then(res => res.json())
    .then(games => {setRows(games)});




  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
