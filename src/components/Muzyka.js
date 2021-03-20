import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Box,
  Button,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  TextField,
  TableSortLabel,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const sortParam = (param, order) => (a, b) => {
  const isAsc = order === 'asc';

  var nameA = a[param].toUpperCase(); // ignore upper and lowercase
  var nameB = b[param].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return isAsc ? -1 : 1;
  }
  if (nameA > nameB) {
    return isAsc ? 1 : -1;
  }

  return 0;
};

const Muzyka = ({ songs, putSong, postSong, getSongs, deleteSong }) => {
  const [idToRemove, setIdToRemove] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false); //for formik
  const [initialValues, setInitialValues] = useState(); //for formik
  const [editedItem, setEditedItem] = useState({}); //for formik
  const [editMode, setEditMode] = useState(false); //for formik
  const [releaseDate, setReleaseDate] = useState('');
  const [orderBy, setOrderBy] = useState('author');
  const [order, setOrder] = useState('asc');
  const [sortedData, setSortedData] = useState(songs);

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    setSortedData(songs.sort(sortParam(orderBy, order)));
  }, [songs, orderBy, order]);

  const [authorSearch, setAuthorSearch] = useState('');
  const handleAuthorChange = (event) => {
    setAuthorSearch(event.target.value);
  };

  const [titleSearch, setTitleSearch] = useState('');
  const handleTitleChange = (event) => {
    setTitleSearch(event.target.value);
  };

  useEffect(() => {
    setSortedData(
      songs.filter(
        (s) =>
          s.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
          s.author.toLowerCase().includes(authorSearch.toLowerCase()),
      ),
    );
  }, [authorSearch, titleSearch, songs]);

  const handleOpen = (id) => {
    setIdToRemove(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditForm = (song) => {
    setEditedItem(song);
    setEditMode(true);
    setInitialValues({
      title: song.title,
      author: song.author,
    });
    setReleaseDate(song.release);
    setOpenForm(true);
  };

  const commentButtonsStyles = {
    color: '#ffffff',
    borderRadius: '28px',
    border: '1px solid #18ab29',
    display: 'inline-block',
    cursor: 'pointer',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    textShadow: '0px 1px 0px #2f6627',
    backgroundImage: 'linear-gradient(to bottom right,#44c767,#008022)',
    marginRight: '5px',
  };

  const handleOpenCreateForm = () => {
    setEditedItem({});
    setEditMode(false);
    setInitialValues({ title: '', author: '', release: '' });
    setReleaseDate('');
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  function validateEmpty(value) {
    let error;
    if (!value.trim()) {
      error = 'Pole Wymagane';
    }
    return error;
  }
  function customValidate(value) {
    let error;
    if (!value.trim() || value === null) {
      error = 'Pole Wymagane';
    } else if (value[0] !== value[0].toUpperCase()) {
      error = 'Tytuł musi zaczynać się dużą literą!';
    }
    return error;
  }

  const send = async (values) => {
    let resp;
    if (editMode) {
      resp = putSong(editedItem.id, values);
    } else {
      resp = postSong(values);
    }
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
      } else {
        alert('Pomyślnie dodano utwór');
      }
      getSongs();
      handleCloseForm();
    });
  };

  const handleDelete = () => {
    const resp = deleteSong(idToRemove);
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
      } else {
        getSongs();
        alert('Pomyślnie usunięto utwór');
      }
    });
    handleClose();
  };

  return (
    <>
      <Box
        mt="2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="4rem"
      >
        <button onClick={handleOpenCreateForm}>Dodaj utwór</button>

        <Box marginTop="2rem" marginBottom="1rem">
          <TextField
            id="standard"
            label="Szukaj według autora"
            onChange={handleAuthorChange}
            style={{ marginRight: '10px' }}
          />
          <TextField
            id="standard-basic"
            label="Szukaj według tytułu"
            onChange={handleTitleChange}
          />
        </Box>
        <TableContainer
          style={{
            width: '50%',
            // color: '#FFF',
            // background: '#000',
            // backgroundClip: 'padding-box'
          }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="author"
                  sortDirection={orderBy === 'author' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'author'}
                    direction={orderBy === 'author' ? order : 'asc'}
                    onClick={createSortHandler('author')}
                  >
                    Author
                  </TableSortLabel>
                </TableCell>
                <TableCell key="title">
                  <TableSortLabel
                    active={orderBy === 'title'}
                    direction={orderBy === 'title' ? order : 'asc'}
                    onClick={createSortHandler('title')}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!sortedData.length ? (
                sortedData.map((song, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {song.author}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        style={{ textDecoration: 'none', color: '#999999' }}
                        to={`/music/${song.id}`}
                      >
                        {song.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <EditIcon onClick={() => handleOpenEditForm(song)} />
                      <DeleteIcon onClick={() => handleOpen(song.id)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="nothing">
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row">
                    {'Nothing to display'}
                  </TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box display="flex" mt="2rem" justifyContent="center">
              <Paper
                style={{
                  padding: '1rem 2rem',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  borderRadius: '28px',
                  textDecoration: 'none',
                  backgroundImage:
                    'linear-gradient(to bottom right,rgb(116, 116, 116), black)',
                  border: '1px solid #000000',
                }}
              >
                <h2
                  style={{
                    color: 'white',
                    textShadow: 'black 0 1px',
                  }}
                >
                  Czy na pewno chcesz usunąć ten utwór?
                </h2>
                <div
                  style={{
                    color: 'white',

                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button style={commentButtonsStyles} onClick={handleDelete}>
                    Tak
                  </Button>
                  <Button style={commentButtonsStyles} onClick={handleClose}>
                    Anuluj
                  </Button>
                </div>
              </Paper>
            </Box>
          </Modal>
        )}
        {openForm && (
          <Modal
            open={openForm}
            onClose={handleCloseForm}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box display="flex" mt="2rem" justifyContent="center">
              <Paper
                style={{
                  // padding: '1rem 2rem',
                  width: '60%',
                  minHeight: '300px',
                  borderRadius: '28px',
                  fontFamily: 'Helvetica',
                  fontWeight: 'lighter',
                  border: '1px solid #000000',
                  backgroundColor: 'transparent',
                }}
              >
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, { setSubmitting }) => {
                    await send({ ...values, release: releaseDate });
                    setSubmitting(false);
                  }}
                >
                  {({
                    isSubmitting,
                    errors,
                    resetForm,
                    handleChange,
                    values,
                  }) => (
                    <Form
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '200px',
                        width: '100%',
                        backgroundImage:
                          'linear-gradient(to bottom right,rgb(116, 116, 116), black)',
                        height: '100%',
                        borderRadius: '28px',
                        border: '1px solid #000000',
                        padding: '15px',
                        // marginBottom: '-20px'
                      }}
                    >
                      <div
                        classname="dataa2"
                        style={{
                          borderRadius: '14px',
                          display: 'inline-block',
                          color: '#292929',
                          fontFamily: 'Arial',
                          fontWeight: 'lighter',
                          fontSize: '17px',
                          padding: '16px 46px',
                          textDecoration: 'none',
                          marginBottom: '15px',
                          marginTop: '7px',
                          backgroundImage:
                            'linear-gradient(to bottom right,#DCDCDC,#E8F4F5)',
                          // MozBoxShadow:    'inset 0 0 7px #000000',
                          // WebkitBoxShadow: 'inset 0 0 7px #000000',
                          // boxShadow: 'inset 0 0 7px #000000'
                        }}

                        // }}
                      >
                        <div style={{}}>
                          <label>Tytuł: </label>
                          <Field
                            type="text"
                            name="title"
                            validate={customValidate}
                          />
                          {errors.title && <div>{errors.title}</div>}
                        </div>
                        <div>
                          <label>Autor: </label>
                          <Field
                            type="text"
                            name="author"
                            validate={validateEmpty}
                          />
                          {errors.author && <div>{errors.author}</div>}
                        </div>
                      </div>
                      <div className="dataWydania">
                        <label style={{ marginRight: '5px' }}>
                          Data wydania:{' '}
                        </label>
                        <TextField
                          onChange={(e) => setReleaseDate(e.target.value)}
                          value={releaseDate}
                          type="date"
                          name="release"
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <button
                          style={commentButtonsStyles}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Zatwierdź
                        </button>
                        <button
                          style={commentButtonsStyles}
                          type="button"
                          onClick={() => {
                            const resetFormConfirm = window.confirm(
                              'Czy na pewno chcesz zresetować formularz?',
                            );
                            if (resetFormConfirm) {
                              resetForm(initialValues);
                              if (editMode) {
                                setReleaseDate(editedItem.release);
                              } else {
                                setReleaseDate('');
                              }
                            }
                          }}
                        >
                          Resetuj formularz
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default Muzyka;
