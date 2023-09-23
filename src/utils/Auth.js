export default function Auth() {

  // const baseUrl = 'https://api.get-mesto.nomoreparties.co';
  const baseUrl = 'http://localhost:3000';
  const headers = { 'Content-Type': 'application/json' };

  function _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.json())
    }
    return res.json();
  }

  async function register(name, email, password) {
    const res = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      })
    });
    return _getResponseData(res);
  }

  async function login(email, password) {
    const res = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });
    return _getResponseData(res);
  }

  async function getUserAuth(jwt) {
    const res = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...headers,
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });
    return _getResponseData(res);
  }

  return { register, login, getUserAuth };
}