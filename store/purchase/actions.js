async function getPurchases(_, params = {}) {
  const { data } = await this.$axios.get('/purchase', {
    headers: { Authorization: `Bearer ${params.token}` },
  });
  return data;
}
async function createPurchase(_, params) {
  const { data } = await this.$axios.post('/purchase', { ...params });
  return data;
}

async function getPurchase(_, params = {}) {
  const { id, token } = params;
  const { data } = await this.$axios.get(`/purchase/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

async function editPurchase(_, params = {}) {
  const { id, datum, token } = params;
  console.log({ ...params }, 'ini');
  const { data } = await this.$axios.put(
    `/purchase/${id}`,
    { ...datum },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
}

async function delPurchase(_, id) {
  const { data } = await this.$axios.delete(`/purchase/${id}`);
  return data;
}

async function addPurchase(_, params) {
  const { datum, token } = params;
  const { data } = await this.$axios.post(
    `/purchasedetail/`,
    { ...datum },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
}

async function delDetail(_, params) {
  const { id, token } = params;
  const { data } = await this.$axios.delete(`/purchasedetail/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export default {
  getPurchases,
  getPurchase,
  createPurchase,
  editPurchase,
  delPurchase,
  addPurchase,
  delDetail,
};
