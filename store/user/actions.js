async function getUsers(_) {
  const { data } = await this.$axios.get('/user');
  console.log({ data, msg: 'get all users' });
  return data;
}
async function createUser(_, params) {
  const { data } = await this.$axios.post('/auth/register', { ...params });
  console.log({ data, msg: 'response create user' });
  return data;
}

async function getUser(_, id) {
  const { data } = await this.$axios.get(`/user/${id}`);
  return data;
}

async function editUser(_, id, params = {}) {
  console.log(params, 'ini param');
  const { data } = await this.$axios.put(`/user/${id}`, { ...params });
  return data;
}

async function delUser(_, id) {
  const { data } = await this.$axios.delete(`/user/${id}`);
  return data;
}

export default {
  getUsers,
  getUser,
  createUser,
  editUser,
  delUser,
};
