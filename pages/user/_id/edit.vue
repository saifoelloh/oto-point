<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit User">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.full_name"
                label="Nama Lengkap"
                counter="20"
                required
              />
              <v-text-field
                v-model="user.username"
                label="Username"
                counter="20"
                required
              />
              <v-text-field
                v-model="user.email"
                label="Email"
                counter="20"
                required
              />
              <v-select v-model="user.role" :items="roles" label="Role" />
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                counter="20"
                required
              />
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/user">cancel</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import materialCard from '~/components/material/AppCard';

export default {
  head: {
    title: 'Oto Point | Dealer',
  },

  components: { materialCard },

  layout: 'dashboard',

  data: () => ({
    user: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
    roles: ['user', 'admin', 'bengkel', 'dealer'],
  }),

  mounted() {
    this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({ getUser: 'user/getUser', editUser: 'user/editUser' }),
    async fetch(id) {
      const { data } = await this.getUser(id);
      this.user = { ...data };
      this.user.password = '';
    },
    async submit() {
      const params = { ...this.user };
      console.log({ params });
      const { data } = await this.editUser(this.$route.params.id, params);
      if (data) this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
