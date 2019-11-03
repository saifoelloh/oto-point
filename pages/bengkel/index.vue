<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="text-right" to="/bengkel/create" color="success">
          <v-icon left>mdi-plus</v-icon> tambah
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="10"
          loading
          loading-text="Loading... Please wait"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td width="300">
              <v-avatar
                v-if="props.item.photo"
                size="48px"
                color="grey"
                class="mr-2 my-1"
              >
                <img :src="base + props.item.photo" alt="" />
              </v-avatar>
              {{ props.item.name }}
            </td>
            <td>{{ props.item.address }}</td>
            <td>
              Lat: {{ props.item.lat }} <br />
              Lng: {{ props.item.lng }}
            </td>
            <td>{{ props.item.description }}</td>
            <td style="display: inline-flex">
              <v-btn
                color="info"
                :to="'/bengkel/' + props.item.id + '/edit'"
                small
              >
                <v-icon>border_color</v-icon>
              </v-btn>
              <!-- TODO: delete yankes -->
              <v-btn
                color="error"
                @click.native.stop="onDelete(props.item.id)"
                small
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  head: {
    title: 'Oto Point | Bengkel',
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
        text: 'Nama',
        value: 'name',
      },
      {
        text: 'Alamat',
        value: 'address',
      },
      {
        text: 'Letak',
        value: 'lat',
      },
      {
        text: 'Deskripsi',
        value: 'description',
      },
      { text: 'Aksi', value: 'id', sortable: false },
    ],
    data: [],
    base: 'https://57b6a033.ngrok.io/',
  }),

  mounted() {
    this.fetchUsers();
  },

  methods: {
    ...mapActions({
      getBengkels: 'bengkel/getBengkels',
      delBengkel: 'bengkel/delBengkel',
    }),
    async fetchUsers() {
      const { data } = await this.getBengkels();
      console.log({ data });
      this.data = data;
    },
    async onDelete(id) {
      const token = localStorage.getItem('token');
      const data = await this.delBengkel({ id, token });
      if (data.status) this.$router.go(0);
    },
  },
};
</script>
