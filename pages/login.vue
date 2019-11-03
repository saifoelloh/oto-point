<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card color="success" elevation="12" title="Connexion">
            <v-card-text>
              <v-form>
                <v-text-field
                  type="text"
                  v-model="username"
                  prepend-icon="person"
                  name="username"
                  label="Login"
                  :placeholder="defaultUserPassword"
                />
                <v-text-field
                  type="password"
                  v-model="password"
                  prepend-icon="lock"
                  label="Password"
                  :placeholder="defaultUserPassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click="authenticate">
                  Login
                </v-btn>
              </v-layout>
            </v-card-actions>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex';
import materialCard from '~/components/material/AppCard';

export default {
  components: {
    materialCard,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      setUsername: 'user/setUsername',
    }),
    async authenticate() {
      const result = await this.$axios.post('auth/login', {
        email: this.username,
        password: this.password,
      });
      const { data } = result.data;
      if (data.token != undefined) {
        await localStorage.setItem('token', data.token);
        await this.setUsername(data.user.username);
        this.$router.push({ path: 'user' });
      }
    },
  },
};
</script>
