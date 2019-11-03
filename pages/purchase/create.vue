<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-btn to="/user" color="primary">
              <v-icon left>mdi-arrow-left</v-icon> kembali
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex md5>
                <v-form>
                  <v-select
                    v-model="purchase.user_id"
                    :items="users"
                    item-text="full_name"
                    item-value="id"
                    label="User"
                  />
                  <v-text-field
                    v-model="purchase.point"
                    type="number"
                    label="Point"
                    required
                  />
                  <v-btn color="blue" @click="submit">submit</v-btn>
                  <v-btn color="warning" @click="reset">cancel</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script charset="utf-8">
import { mapActions, mapGetters } from 'vuex';

export default {
  head: {
    title: 'Oto Point | Penjualan',
  },

  layout: 'dashboard',

  data: () => ({
    purchase: {
      user_id: '',
      point: 0,
    },
    users: [],
  }),

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapActions({
      createPurchase: 'purchase/createPurchase',
      getUsers: 'user/getUsers',
    }),
    async fetch() {
      const { data } = await this.getUsers();
      this.users = data;
    },
    async submit() {
      const params = { ...this.user };
      params.point = parseInt(params.point);
      const result = this.createPurchase(params);

      if (result) this.$router.go(-1);
    },
  },
  reset() {
    this.$refs.form.reset();
  },
};
</script>
