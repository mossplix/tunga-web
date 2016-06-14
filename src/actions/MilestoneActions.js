import Constants              from '../constants/milestoneConstants';
//import { push }               from 'react-router-redux';
import fetch        from 'isomorphic-fetch';


const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};



function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function httpGet(url) {

  return fetch(url, {
      credentials: 'include',
      headers: defaultHeaders,
  })
  .then(checkStatus)
  .then(parseJSON);
}

function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(url, {
      credentials: 'include',
      method: 'post',
      headers: buildHeaders(),
      body: body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

function httpDelete(url) {

  return fetch(url, {
      credentials: 'include',
      method: 'delete',
      headers: defaultHeaders,
  })
  .then(checkStatus)
  .then(parseJSON);
}



const Actions = {
  fetchMilestones: () => {
    return dispatch => {
      dispatch({ type: Constants.BOARDS_FETCHING });

      httpGet('/api/updates')
      .then((data) => {
        dispatch({
          type: Constants.UPDATES_RECEIVED,
          data: data
        });
      });
    };
  },

  createUpdate: (data) => {
    return dispatch => {
      httpPost('/api/createUpdate', { board: data })
      .then((data) => {
        dispatch({
          type: Constants.NEW_UPDATE_CREATED,
          data: data,
        });

        //dispatch(push(`/updates/${data.id}`));
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
            type: Constants.UPDATE_CREATE_ERROR,
            errors: json.errors,
          });
        });
      });
    };
  },
    createUpdateRequest: (data) => {
        return dispatch => {
          httpPost('/api/create_update_request', { board: data })
          .then((data) => {
            dispatch({
              type: Constants.NEW_UPDATE_REQUEST_CREATED,
              board: data,
            });

            //dispatch(push(`/update_requests/${data.id}`));
          })
          .catch((error) => {
            error.response.json()
            .then((json) => {
              dispatch({
                type: Constants.UPDATE_REQUEST_CREATE_ERROR,
                errors: json.errors,
              });
            });
          });
        };
      }
};

export default Actions;
