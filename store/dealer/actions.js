async function createDealer(_, params) {
  const { fd, token } = params;
  const { data } = await this.$axios.post('/dealer', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function getDealers(_, params = {}) {
  const { data } = await this.$axios.get('/dealer', {
    headers: { Authorization: `Bearer ${params.token}` },
  });
  return data;
}

async function getDealer(_, id = 0) {
  const { data } = await this.$axios.get(`/dealer/${id}`);
  return data;
}

async function putDealer(_, params) {
  const { id, fd, token } = params;
  const { data } = await this.$axios.post(`/dealer/update/${id}`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function delDealer(_, params) {
  const { id, token } = params;
  const { data } = await this.$axios.delete(`dealer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
  return data;
}

export default {
  createDealer,
  getDealers,
  getDealer,
  putDealer,
  delDealer,
};
