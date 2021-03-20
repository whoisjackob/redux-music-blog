import { Box, Button, Card, Modal, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import React, { memo, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Formik, Form, Field } from 'formik';

const Dyskusja = ({ posts, postPost, putPost, getPosts, deletePost }) => {
  const [idToRemove, setIdToRemove] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false); //for formik
  const [initialValues, setInitialValues] = useState(); //for formik
  const [commentsList, setCommentsList] = useState([]); //for formik
  const [comment, setComment] = useState(''); //for formik
  const [editedItem, setEditedItem] = useState({}); //for formik
  const [editMode, setEditMode] = useState(false); //for formik
  const [item, setItem] = useState('');
  const [itemIndex, setItemIndex] = useState(-1);
  const [editCommentMode, setEditCommentMode] = useState(false);
  const [sortedData, setSortedData] = useState(posts);
  const [titleSearch, setTitleSearch] = useState('');

  const handleTitleSearch = (event) => {
    setTitleSearch(event.target.value);
  };

  const [detailsSearch, setDetailsSearch] = useState('');

  const handleEditOpen = (comment, commentId) => {
    setItem(comment);
    setItemIndex(commentId);
    setEditCommentMode(true);
  };

  const handleUpdate = (element, index) => {
    setCommentsList((comments) =>
      comments.map((c, i) => (index === i ? element : c)),
    );
    handleCloseCommentEdit();
  };

  const handleCloseCommentEdit = () => {
    setItem('');
    setItemIndex(-1);
    setEditCommentMode(false);
  };

  const handleDetailsSearch = (event) => {
    setDetailsSearch(event.target.value);
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleOpen = (id) => {
    setIdToRemove(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditForm = (post) => {
    setEditedItem(post);
    setEditMode(true);
    setInitialValues({ title: post.title, body: post.body });
    setCommentsList([...post.comments]);
    setOpenForm(true);
  };

  const handleOpenCreateForm = () => {
    setEditedItem({});
    setEditMode(false);
    setInitialValues({ title: '', body: '' });
    setCommentsList([]);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };



  useEffect(() => {
    setSortedData(
      posts.filter(
        (p) =>
          p.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
          p.body.toLowerCase().includes(detailsSearch.toLowerCase()),
      ),
    );
  }, [detailsSearch, titleSearch, posts]);

  const handleDelete = () => {
    const resp = deletePost(idToRemove);
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
      } else {
        getPosts();
        alert('Pomyślnie usunięto post.');
      }
    });
    handleClose();
  };

  const send = async (values) => {
    let resp;
    if (editMode) {
      resp = putPost(editedItem.id, values);
    } else {
      resp = postPost(values);
    }
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
      } else {
        alert('Pomyślnie dodano post.');
      }
      getPosts();
      handleCloseForm();
    });
  };

  function validateEmpty(value) {
    let error;
    if (!value.trim()) {
      error = 'Pole Wymagane';
    }
    return error;
  }

  const deleteComment = (i) => {
    setCommentsList((comments) =>
      comments.filter((c) => comments.indexOf(c) !== i),
    );
  };

  function customValidate(value) {
    let error;
    if (!value.trim() || value === null) {
      error = 'Pole Wymagane';
    } else if (value[0] !== value[0].toUpperCase()) {
      error = 'Tytuł musi zaczynać się dużą literą!';
    }
    return error;
  }

  const displayCommentsTable = !commentsList.length ? 'none' : '';

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

  return (
    <div style={{ marginTop: '4rem' }}>
      <button onClick={handleOpenCreateForm}>Dodaj post</button>
      <Box marginTop="2rem">
        <TextField
          id="standard"
          label="Szukaj według tytułu"
          onChange={handleTitleSearch}
          style={{ marginRight: '10px' }}
        />
        <TextField
          id="standard-basic"
          label="Szukaj według treści"
          onChange={handleDetailsSearch}
        />
      </Box>
      {!!sortedData.length ? (
        sortedData.map((p) => (
          <Box
            mb={2}
            mt={2}
            display={'flex'}
            flexDirection={'column'}
            alignItems="center"
            key={`${p.id}-${p.title}`}
          >
            <Card
              style={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingLeft: '2rem',
                paddingRight: '1rem',
                // boxShadow: '0 0 5px #000000',
                // fontFamily: 'Courier New',
                // backgroundImage:
                //   'linear-gradient(to bottom right,#FFFFFF,#757575)',

                borderRadius: '14px',
                backgroundImage:
                  'linear-gradient(to bottom right,#F5F5F5,#BCBCBC)',
              }}
            >
              <Box display="flex" justifyContent="space-between" width="100%">
                <Link
                  to={`/discussion/${p.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#871F78',
                    fontWeight: 'bold',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Helvetica',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    {/* Title -  */}
                    {p.title}
                  </p>
                </Link>
                <div
                  style={{
                    marginTop: '10px',
                  }}
                >
                  <Box m={1}>
                    <EditIcon onClick={() => handleOpenEditForm(p)} />
                    <DeleteIcon onClick={() => handleOpen(p.id)} />
                  </Box>
                </div>
              </Box>
              <p
                style={{
                  fontFamily: 'Helvetica',
                  fontWeight: 'lighter',
                  // boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
                  // filter: 'blur(2px)',
                  // background: 'inherit'
                  // borderStyle: 'outset',
                  // margin: '5px',
                  // padding: '10px',
                  // borderRadius: '14px',
                  // // border: '5px silver'
                  marginTop: '-12px',
                }}
              >
                {/* Details -  */}
                {p.body}
              </p>
              {open && (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <Box display="flex" mt="2rem" justifyContent="center">
                    <Paper style={{
                        padding: '1rem 2rem',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                      borderRadius: '28px',
                      textDecoration: 'none',
                      backgroundImage:
                          'linear-gradient(to bottom right,rgb(116, 116, 116), black)',
                      border: '1px solid #000000',

                    }}>
                      <h2 style={{
                        color: 'white',
                        textShadow: 'black 0 1px'
                      }}>Czy na pewno chcesz usunąć ten post?</h2>
                      <div style={{
                        color: 'white',

                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                      }}>
                      <Button style={commentButtonsStyles} onClick={handleDelete}>Tak</Button>
                      <Button style={commentButtonsStyles} onClick={handleClose}>Anuluj</Button>
                      </div>
                    </Paper>
                  </Box>
                </Modal>
              )}
            </Card>
          </Box>
        ))
      ) : (
        <Box
          mb={2}
          mt={2}
          display={'flex'}
          flexDirection={'column'}
          alignItems="center"
          key={`nothing`}
        >
          <Card
            style={{
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: '2rem',
              paddingRight: '1rem',
              boxShadow: '0 0 5px #000000',
              fontFamily: 'Courier New',
              backgroundImage:
                'linear-gradient(to bottom right,#FFFFFF,#757575)',
            }}
          >
            <Box display="flex" justifyContent="space-between" width="100%">
              <p>{'Nothing to display'}</p>
            </Box>
          </Card>
        </Box>
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
                  await send({ ...values, comments: commentsList });
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, errors, resetForm }) => (
                  <Form
                    style={{
                      // display: 'flex',
                      // flexDirection: 'column',
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                      // minHeight: '200px',
                      // width: '100%',
                      // backgroundImage:
                      //   'linear-gradient(to bottom right,rgb(116, 116, 116), black)',
                      // height: '100%',
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
                    <div className="dataa">
                      <div>
                        <label>Tytuł: </label>
                        <Field
                          type="text"
                          name="title"
                          validate={customValidate}
                        />
                        {errors.title && <div>{errors.title}</div>}
                      </div>
                      <div>
                        <label>Treść: </label>
                        <Field
                          type="text"
                          name="body"
                          validate={validateEmpty}
                        />
                        {errors.body && <div>{errors.body}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <TextField
                        label="Dodaj komentarz"
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          if (comment !== '') {
                            setCommentsList((commentsList) => [
                              ...commentsList,
                              comment,
                            ]);
                            setComment('');
                          }
                        }}
                        type="button"
                      >
                        Dodaj
                      </button>
                    </div>
                    <div
                      className="dataa"
                      style={{
                        display: displayCommentsTable,
                      }}
                    >
                      <table>
                        <tbody>
                          {commentsList.map((el, i) => (
                            <Box
                              display="flex"
                              width="500px"
                              justifyContent="space-between"
                              key={`${i}-${el}`}
                            >
                              {editCommentMode && i === itemIndex ? (
                                <TextField
                                  onChange={(e) => setItem(e.target.value)}
                                  value={item || el}
                                />
                              ) : (
                                <th>{el}</th>
                              )}
                              {editCommentMode && i === itemIndex ? (
                                <div
                                  style={{
                                    fontFamily: 'Arial',
                                  }}
                                >
                                  <Button
                                    style={commentButtonsStyles}
                                    onClick={() => handleUpdate(item, i)}
                                  >
                                    Zaktualizuj
                                  </Button>
                                  <Button
                                    style={commentButtonsStyles}
                                    onClick={handleCloseCommentEdit}
                                  >
                                    Zamknij
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <EditIcon
                                    onClick={() => handleEditOpen(el, i)}
                                  />
                                  <DeleteIcon
                                    onClick={() => deleteComment(i)}
                                  />
                                </div>
                              )}
                            </Box>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        // borderRadius: '28px',
                        // fontFamily: 'Arial'
                      }}
                    >
                      <button type="submit" disabled={isSubmitting}>
                        Zatwierdź
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const resetFormConfirm = window.confirm(
                            'Czy na pewno chcesz zresetować formularz?',
                          );
                          if (resetFormConfirm) {
                            resetForm(initialValues);
                            if (editMode) {
                              setCommentsList([...editedItem.comments]);
                            } else {
                              setCommentsList([]);
                            }
                          }
                        }}
                      >
                        Zresetuj Formularz
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default memo(Dyskusja);
