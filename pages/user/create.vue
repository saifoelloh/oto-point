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
                  <v-text-field
                    v-model="user.username"
                    label="Username"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="user.full_name"
                    label="Nama Lengkap"
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
                    type="password"
                    counter="20"
                    label="Password"
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
    title: 'Oto Point | User',
  },

  layout: 'dashboard',

  data: () => ({
    user: {
      username: '',
      full_name: '',
      email: '',
      password: '',
      role: '',
    },
    roles: ['admin', 'dealer', 'bengkel'],
  }),

  methods: {
    ...mapActions({ createUser: 'user/createUser' }),
    async submit() {
      const token = localStorage.getItem('token');
      const datum = { ...this.user };
      const data = this.createUser({ token, datum });
      if (data.status) this.$router.go(-1);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
