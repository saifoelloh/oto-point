async function getCars(_) {
  const result = await this.$axios.get('http://c4f73f6d.ngrok.io');
  console.log({ result });
  return result;
}
async function createCar(_, params) {
  console.log({ params, msg: 'ini param' });
  const result = await this.$axios.post(
    'http://c4f73f6d.ngrok.io/auth/create',
    { ...params },
  );
  console.log(result);
  return result;
}

async function getCar(_, id) {
  console.log({ id, msg: 'ini params get user' });
  const result = await this.$axios.get(`http://c4f73f6d.ngrok.io/auth/${id}`);
  console.log({ result });
  return result;
}

async function editCar(_, id, params) {
  console.log({ params, msg: 'ini param edit user' });
  const result = await this.$axios.put(`http://c4f73f6d.ngrok.io/auth/${id}`, {
    ...params,
  });
  console.log({ result, msg: 'ini hasil edit user' });
}

export default {
  getCars,
  createCar,
  getCar,
  editCar,
};
