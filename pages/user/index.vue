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
          :items="data"
          :total-items="data.length"
          row-per-page-items="10"
          loading
          loading-text="Loading... Please wait"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.full_name }}</td>
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.role }}</td>
            <td class="display-inline-flex">
              <v-btn color="info" small :to="`/user/${props.item.id}/edit`">
                <v-icon>border_color</v-icon>
              </v-btn>
              <v-btn color="danger" small @click="onDelete(props.item.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
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
        text: 'Nama Lengkap',
        value: 'full_name',
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

  watch: {
    pagination: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    ...mapActions({
      getUsers: 'user/getUsers',
    }),
    async fetchUsers() {
      const { data } = await this.getUsers();
      this.data = data;
    },
  },
};
</script>
