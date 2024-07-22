const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "ad7c8cda-be8b-428f-80a7-1bafe19ad7d0",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok)
    return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

const f = (url, cfg) => fetch(`${config.baseUrl}${url}`, { headers: config.headers, ...cfg }).then(checkResponse)

function getInitialCards() {
  return f(`/cards`)
}

function addNewCards(name, link) {
  return f(`/cards`, { method: "POST", body: JSON.stringify({ name, link }) })
}

function deleteCard(id) {
  return f(`/cards/${id}`, { method: "DELETE" })
}

function likeCard(id) {
  return f(`/cards/likes/${id}`, { method: "PUT" })
}

function unlikeCard(id) {
  return f(`/cards/likes/${id}`, { method: "DELETE" })
}

function getUser() {
  return f(`/users/me`)
}

function updateUser(name, about) {
  return f(`/users/me`, { method: "PATCH", body: JSON.stringify({ name, about }) })
}

function updateUserAvatar(avatar) {
  return f(`/users/me/avatar`, { method: "PATCH", body: JSON.stringify({ avatar }) })
}

export default {
  getInitialCards,
  addNewCards,
  deleteCard,
  likeCard,
  unlikeCard,
  getUser,
  updateUser,
  updateUserAvatar
}