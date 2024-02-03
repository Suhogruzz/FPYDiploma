import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = 'http://127.0.0.1:8000/api/';

export async function getCsrfCookie() {
  try {
    const response = await fetch(`${BASE_URL}auth/get_csrf/`);
    if (!response.status === 200) {
      throw new Error('Error fetching CSRF cookie');
    }
    const data = await response.data;
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
  }
}

export function logIn(email, password) {
  return fetch(`${BASE_URL}auth/login/`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function logOut() {
  try {
    return fetch(`${BASE_URL}auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
    });
  } catch (error) {
    console.error('Logout request failed:', error);
    throw error;
  }
}

export async function userMe() {
  try {
    const response = await axios.get(`${BASE_URL}auth/me/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `sessionid=${Cookies.get('sessionid')}`,
      },
    });
    return response;
  } catch (error) {

    console.error(error);
    throw error;
  }
}

export async function getUserList() {
  try {
    const response = await axios.get(`${BASE_URL}detail_users_list/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
    return await response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export function deleteUser(id) {
  try {
    return axios.delete(`${BASE_URL}delete_user/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Authorization': `sessionid=${Cookies.get('sessionid')}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function patchUser(id, isStaff) {
  try {
    return await axios.patch(`${BASE_URL}auth/users/${id}/`, {
      is_staff: isStaff,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Authorization': `sessionid=${Cookies.get('sessionid')}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

export function signUp(data) {
  try {
    return axios.post(`${BASE_URL}register/`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postFile(data) {
  try {
    return await axios.post(`${BASE_URL}files/`, data, {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Authorization': `sessionid=${Cookies.get('sessionid')}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

export function getFiles() {
  try {
    return axios.get(`${BASE_URL}files/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getUserFiles(userId) {
  try {
    return axios.get(`${BASE_URL}files/?user_id=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error occurred while fetching user files:', error);
    throw error;
  }
}

export function patchFile(data, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `?user_storage_id=${userStorageId}`;
  }

  return axios.patch(`${BASE_URL}files/${params}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  });
}

export function deleteFile(id, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `&user_storage_id=${userStorageId}`;
  }

  return axios.delete(`${BASE_URL}files/?id=${id}${params}`, {
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json',
    },
  });
}

export function downloadFile(id) {
  try {
    return axios.get(`${BASE_URL}link/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error occurred during file download:', error);
    throw error;
  }
}

export function getDownloadLink(id) {
  return axios.get(`${BASE_URL}link/?file_id=${id}`)
    .catch(error => {
      console.error('Error:', error);
    });
}
