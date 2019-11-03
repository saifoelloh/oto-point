async function createBengkel(_, params) {
  const { token, datum } = params;
  const { data } = await this.$axios.post(
    '/bengkel',
    { ...datum },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

async function getBengkels(_, params = {}) {
  const { data } = await this.$axios.get('/bengkel', params);
  return data;
}

async function getBengkel(_, id = 0) {
  const { data } = await this.$axios.get(`/bengkel/${id}`);
  return data;
}

async function putBengkel(_, params) {
  const { id, fd, token } = params;
  const data = await this.$axios.post(`/bengkel/update/${id}`, fd, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log({ data, msg: 'pesan' });
  return data;
}

async function delBengkel(_, params) {
  const { id, token } = params;
  const { data } = await this.$axios.delete(`dealer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export default {
  createBengkel,
  getBengkels,
  getBengkel,
  putBengkel,
  delBengkel,
};
