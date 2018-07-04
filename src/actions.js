export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const RATING_UPDATE = 'RATING_UPDATE';
export const ORDER_UPDATE = 'ORDER_UPDATE';
export const DATE_PICKED = 'DATE_PICKED';

export const pickDate = date => ({
  type: DATE_PICKED,
  payload: date,
});

export const requestQuestions = date => ({
  type: FETCH_QUESTIONS_REQUEST,
  payload: date,
});

export const receiveQuestions = (date, json) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: {
    date,
    json,
  },
});

export const requestFailure = error => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: { error },
});

export const updateRating = (id, inc) => ({
  type: RATING_UPDATE,
  payload: {
    id,
    inc,
  },
});

export const updateOrder = (isDragged, newOrder) => ({
  type: ORDER_UPDATE,
  payload: {
    isDragged,
    newOrder,
  },
});

export function fetchQuestions(date) {
  return (dispatch) => {
    dispatch(requestQuestions(date));
    return fetch(`http://api.stackexchange.com/2.2/search/advanced?pagesize=5&fromdate=${date}&order=desc&sort=votes&title=react-redux&site=stackoverflow`)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveQuestions(date, json));
      }).catch(error => dispatch(requestFailure(error)));
  };
}
