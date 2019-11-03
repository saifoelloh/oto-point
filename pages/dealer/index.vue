<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="text-right" to="/dealer/create" color="success">
          <v-icon left>mdi-plus</v-icon> tambah
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="data"
          :total-items="data.length"
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
            <td width="180">
              Lat: {{ props.item.lat }} <br />
              Lng: {{ props.item.lng }}
            </td>
            <td>{{ props.item.description }}</td>
            <td style="display: inline-flex">
              <v-btn
                color="info"
                :to="'/dealer/' + props.item.id + '/edit'"
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
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Address',
        value: 'address',
      },
      { text: 'Lokasi', value: 'lat' },
      {
        text: 'Deskripsi',
        value: 'descripition',
      },
      { text: 'Aksi', value: 'id', sortable: false },
    ],
    data: [],
    base: 'https://57b6a033.ngrok.io/',
  }),

  mounted() {
    this.fetchDealers();
  },

  methods: {
    ...mapActions({
      getDealers: 'dealer/getDealers',
      delDealer: 'dealer/delDealer',
    }),
    async fetchDealers() {
      const { data } = await this.getDealers();
      this.data = data;
    },
    async onDelete(id) {
      const token = localStorage.getItem('token');
      const data = await this.delDealer({ id, token });
      if (data.status) this.$router.go(0);
    },
  },
};
</script>
