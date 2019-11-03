<template>
  <v-container>
    <v-card>
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
            <td>{{ props.item.user_id }}</td>
            <td>{{ props.item.status }}</td>
            <td>{{ props.item.point }}</td>
            <td class="display-inline-flex">
              <v-btn color="success" small :to="`/purchase/${props.item.id}`">
                <v-icon>visibility</v-icon>
              </v-btn>
              <v-btn color="info" small :to="`/purchase/${props.item.id}/edit`">
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
    title: 'Oto Point | Purchase',
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
        text: 'User ID',
        value: 'user_id',
      },
      {
        text: 'Status Pembayaran',
        value: 'status',
      },
      {
        text: 'Point',
        value: 'point',
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
      getPurchases: 'purchase/getPurchases',
      delPurchase: 'purchase/delPurchase',
    }),
    async fetchUsers() {
      const token = localStorage.getItem('token');
      const { data } = await this.getPurchases({ token });
      this.data = data;
    },
    async onDelete(id) {
      console.log(id, 'ini id');
      const { data } = await this.delPurchase(id);
      if (data.status) this.$router.go(0);
    },
  },
};
</script>
