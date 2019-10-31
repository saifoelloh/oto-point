<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="text-right" to="/dealer/create" color="success">
          <v-icon left>mdi-plus</v-icon> create
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
    title: 'Dealer',
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
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Comment',
        value: 'body',
      },
    ],
  }),

  computed: {
    comments() {
      return this.$store.state.dealer.commets;
    },
  },

  created() {
    this.ambilComments();
  },

  methods: {
    ...mapActions({
      fetchComments: 'dealer/fetchComments',
    }),
    async ambilComments() {
      console.log('mulai');
      await this.fetchComments();
      console.log('mulai');
      this.comments = this.$store.state.dealer.commets;
      this.loading = !this.loading;
      console.log(this.comments, this.loading, 'ini selesai');
    },
  },
};
</script>
