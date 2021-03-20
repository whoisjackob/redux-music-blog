const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return [
        ...action.payload.map((el) => ({
          ...el,
          id: el._id,
        })),
      ];
    default:
      return state;
  }
};

export default postReducer;
