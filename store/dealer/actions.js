export default {
  async fetchComments({ commit }) {
    const { data } = await this.$axios.get(
      'https://jsonplaceholder.typicode.com/comments',
    );
    const comments = data;
    commit('SET_COMMENTS', comments);
  },
};
