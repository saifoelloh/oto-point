<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="text-right" to="/user/create" color="success">
          <v-icon left>mdi-plus</v-icon> tambah
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="posts"
          :items-per-page="10"
          loading
          loading-text="Loading... Please wait"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script charset="utf-8">
import { mapActions, mapGetters } from 'vuex';

export default {
  head: {
    title: 'Oto Point | User',
  },
  layout: 'dashboard',
  data: () => ({
    name: '',
    age: 0,
    email: '',
    headers: [
      {
        text: 'No',
        value: 'id',
      },
      {
        text: 'Username',
        value: 'username',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Role',
        value: 'role',
      },
      { text: 'Aksi', value: 'id', sortable: false },
    ],
    data: [],
  }),

  created() {
    this.fetchUsers();
  },

  methods: {
    ...mapActions({
      fetchComments: 'dealer/fetchComments',
    }),
    async fetchUsers() {
      const data = await this.getUsers();
      this.data = data;
    },
  },
};
</script>
