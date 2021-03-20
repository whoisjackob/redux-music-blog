const initialState = [];

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SONGS':
      return [
        ...action.payload.map((el) => ({
          ...el,
          id: el._id,
          release: el.release ? el.release.split('T')[0] : null,
        })),
      ];
    default:
      return state;
  }
};

export default musicReducer;
