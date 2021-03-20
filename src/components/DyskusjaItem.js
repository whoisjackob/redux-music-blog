import { Box, Button, Card, Modal, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const DyskusjaItem = ({
  posts,
  match,
  getPosts,
  postComment,
  putComment,
  deleteComment,
}) => {
  const { push } = useHistory();
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [item, setItem] = useState('');
  const [itemIndex, setItemIndex] = useState();
  const [idToRemove, setIdToRemove] = useState(-1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleCreateOpen = () => {
    setItemIndex();
    setEditMode(false);
    setItem('');
    setOpen(true);
  };
  const handleEditOpen = (comment, commentId) => {
    setItemIndex(commentId);
    setEditMode(true);
    setItem(comment);
    setOpen(true);
  };
  const handleClose = () => {
    setItem('');
    setOpen(false);
  };
  const handleDeleteOpen = (id) => {
    setIdToRemove(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    const postFound = posts.find((p) => p.id === id);
    if (!postFound) {
      alert('Post nie istnieje.');
      push('/discussion');
    } else {
      setPost(postFound);
    }
  }, [id, push, posts]);

  const send = async () => {
    if (!item.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    let resp;
    if (editMode) {
      console.log(id);
      resp = putComment(id, itemIndex, { comment: item });
    } else {
      resp = postComment(id, { comment: item });
    }
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
      } else {
        alert('Sukces');
      }
      getPosts();
      handleClose();
    });
  };

  const handleDelete = () => {
    const resp = deleteComment(id, idToRemove);
    resp.then((res) => {
      if (res.error) {
        alert(res.payload?.message);
        handleDeleteClose();
      } else {
        getPosts();
        alert('Pomyślnie usunięto komentarz.');
        handleDeleteClose();
      }
    });
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
    margin: '5px',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        marginTop: '1rem'
      }}
    >
      <Box width="100%" display="flex" justifyContent="space-around" mt="2rem">
        <Card
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            //=======
            borderRadius: '28px',
            backgroundImage: 'linear-gradient(to bottom right,#F5F5F5,#BCBCBC)',
            justifyContent: 'center',
          }}
        >
          {post ? (
            <>
              <h1
                style={{
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                }}
              >
                {/*Tytuł:*/}
                {post.title}
              </h1>
              <p
                style={{
                  borderRadius: '14px',
                  color: '#303030',
                  backgroundImage:
                    'linear-gradient(to bottom right,#F5F5F5,#F5F5F5)',
                  fontFamily: 'Helvetica',
                  fontWeight: 'lighter',
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingBottom: '10px',
                  // MozBoxShadow:    'inset 0 0 4px #000000',
                  // WebkitBoxShadow: 'inset 0 0 4px #000000',
                  boxShadow: 'inset 0 0 4px #000000',
                }}
              >
                {/*Treść: */}
                {post.body}
              </p>
              <div
                style={
                  {
                    marginBottom: '10px'
                  }
                }
              >
                <Button
                  style={commentButtonsStyles}
                  onClick={handleCreateOpen}
                  variant="contained"
                >
                  Dodaj Komentarz
                </Button>
              </div>
              <Card
                style={{
                  width: 'calc(100% - 4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '2rem',
                  fontFamily: 'Helvetica',
                  fontWeight: 'lighter',
                  borderRadius: '28px',
                }}
              >
                {post.comments?.map((comment, i) => (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p key={`${i - comment}`}>{comment}</p>
                    <div>
                      <EditIcon
                        style={{ marginRight: '2px' }}
                        onClick={() => handleEditOpen(comment, i)}
                      />
                      <DeleteIcon onClick={() => handleDeleteOpen(i)} />
                    </div>
                  </div>
                ))}
              </Card>
            </>
          ) : (
            <></>
          )}
        </Card>
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
                borderRadius: '14px',
                color: '#303030',
                backgroundImage:
                    'linear-gradient(to bottom right,#F5F5F5,#F5F5F5)',
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
              }}>
                <h2>{editMode ? 'Edytuj komentarz' : 'Dodaj komentarz'}</h2>
                <TextField
                  onChange={(e) => setItem(e.target.value)}
                  value={item}
                />
                <Button style={commentButtonsStyles} onClick={send}>
                  Zatwierdź
                </Button>
                <Button style={commentButtonsStyles} onClick={handleClose}>
                  Anuluj
                </Button>
              </Paper>
            </Box>
          </Modal>
        )}
        {deleteOpen && (
          <Modal
            open={deleteOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box display="flex" mt="2rem" justifyContent="center">
              <Paper style={{
                padding: '1rem 2rem',
                borderRadius: '14px',
                color: '#303030',
                backgroundImage:
                    'linear-gradient(to bottom right,#F5F5F5,#F5F5F5)',
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
              }}>
                <h2>Czy na pewno chcesz usunąć ten komentarz?</h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Button style={commentButtonsStyles} onClick={handleDelete}>Tak</Button>
                <Button style={commentButtonsStyles} onClick={handleDeleteClose}>Anuluj</Button>
                </div>
              </Paper>
            </Box>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default DyskusjaItem;
