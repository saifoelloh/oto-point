async function getCars(_, params) {
  const { token } = params;
  const { data } = await this.$axios.get('/car', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data, 'ini mobil');
  return data;
}
async function createCar(_, params) {
  const { token, fd } = params;
  const { data } = await this.$axios.post('/car', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function getCar(_, params) {
  const { id, token } = params;
  const { data } = await this.$axios.get(`/car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

async function editCar(_, params) {
  const { id, token, fd } = params;
  const { data } = await this.$axios.put(`/car/${id}`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function delCar(_, params) {
  const { id, token } = params;
  const { data } = await this.$axios.delete(`/car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export default {
  getCars,
  createCar,
  getCar,
  editCar,
  delCar,
};
