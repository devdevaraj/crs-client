import axios from "axios";
import ENV from "../config";

axios.defaults.baseURL = ENV.SERVER_ADD;

export async function register(credentials) {
  try {
    const token = await localStorage.getItem("token");
    const {
      data: { msg },
    } = await axios.post(`/api/register`, credentials, {
        headers: { Authorization: `Beare ${token}` },
      });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function login({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateUser(data) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("You are not logged in");
    const {
      data: { msg },
    } = await axios.put(`/api/update-user`, data, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject("Couldn't update user");
  }
}

export async function removeUser(username) {
    try {
        const token = await localStorage.getItem("token");
        if (!token) return Promise.reject("You are not logged in");
        const {
            data: { msg },
          } = await axios.delete(`/api/remove-user?username=${username}`, {
            headers: { Authorization: `Beare ${token}` },
          });
          return Promise.resolve(msg);
    } catch(error) {
        return Promise.reject(error);
    }
}

export async function updateUsers(userid, data) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("You are not logged in");
    const {
      data: { msg },
    } = await axios.put(`/api/update-users/${userid}`, data, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject("Couldn't update user");
  }
}

export async function resetPassword(password) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("You are not logged in");
    const { data, status } = await axios.put('/api/reset-password',{ password: password }, { headers: { Authorization: `Beare ${token}` }});
      return Promise.resolve({ data, status });
  } catch (error) {
      return Promise.reject({ error });
  }
}

export async function getContent(cname) {
  try {
    const { data, status } = await axios.get("/api/get-content?cname=" + cname);
    if (status !== 201) return false;
    return data;
  } catch (error) {
    return error;
  }
}

export async function setContent(data) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("Cannot find token");
    const exist = await axios.post("/api/set-content", data, {
      headers: { Authorization: `Beare ${token}` },
    });
    // console.log(exist);
    return Promise.resolve({ exist });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateContent(data) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("You are not logged in");
    const {
      data: { msg },
    } = await axios.put(`/api/update-content`, data, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject("Couldn't update data");
  }
}

export async function getDocument(query) {}

export async function setDocument(data) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("Cannot find token");
    const response = await axios.post("/api/set-document", data, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateDocument(data) {
  try {
    const token = await localStorage.getItem("token");
    const {
      data: { msg },
    } = await axios.put(`/api/update-document`, data, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject("Couldn't update document");
  }
}

export async function removeDocument(id) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) return Promise.reject("You are not logged in");
    const {
      data: { msg },
    } = await axios.delete(`/api/remove-document?did=${id}`, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error);
  }
}
