<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-btn to="/bengkel" color="primary">
              <v-icon left>mdi-arrow-left</v-icon> kembali
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex md5>
                <v-form>
                  <v-text-field
                    v-model="bengkel.name"
                    label="Name"
                    counter="20"
                    required
                  />
                  <v-textarea
                    v-model="bengkel.address"
                    label="Alamat"
                    required
                  />
                  <v-layout>
                    <v-flex>
                      <v-text-field
                        v-model="bengkel.lat"
                        label="Latitude"
                        type="number"
                        required
                      />
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="bengkel.long"
                        label="Longtitude"
                        type="number"
                        required
                      />
                    </v-flex>
                  </v-layout>
                  <img-inputer
                    v-model="bengkel.photo"
                    theme="light"
                    placeholder="Drop bengkel photo"
                    @change="onFileSelected"
                  />
                  <v-textarea
                    name="description"
                    label="Deskrisi"
                    v-model="bengkel.description"
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
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';

export default {
  layout: 'dashboard',
  components: { ImgInputer },
  data: () => ({
    bengkel: {
      name: '',
      photo: '',
      description: '',
      address: '',
      phone: '',
      lat: '',
      long: '',
    },
  }),

  methods: {
    ...mapActions({ createBengkel: 'bengkel/createBengkel' }),
    async submit() {
      const fd = new FormData();
      const params = { ...this.bengkel };

      for (var key in params) {
        fd.append(key, params[key]);
      }

      console.log({ params, msg: 'ini pesan' });

      const { data } = await this.createBengkel(fd);
      if (data) this.$router.go(-1);
    },
    reset() {
      this.$refs.form.reset();
    },
    onFileSelected(event) {
      this.bengkel.photo = event.target.files[0];
    },
  },
};
</script>
