<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-btn to="/mobil" color="primary">
              <v-icon left>mdi-arrow-left</v-icon> kembali
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex md5>
                <v-form>
                  <v-text-field
                    v-model="mobil.name"
                    label="Nama"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.model"
                    label="Model"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.machineCapacity"
                    type="number"
                    min="0"
                    label="Kapasitas Mesin"
                    required
                  />
                  <v-text-field
                    v-model="mobil.color"
                    label="Warna"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.price"
                    type="number"
                    min="0"
                    label="Harga"
                    required
                  />
                  <v-textarea
                    name="description"
                    label="Deskrisi"
                    v-model="mobil.description"
                    required
                  ></v-textarea>
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
export default {
  layout: 'dashboard',
  data: () => ({
    mobil: {
      name: '',
      model: '',
      machineCapacity: 0,
      color: '',
      price: 0,
      description: '',
    },
  }),

  methods: {
    async submit() {
      const params = {
        name: this.mobil.name,
        model: this.mobil.model,
        machineCapacity: parseInt(this.mobil.machineCapacity),
        color: this.mobil.color,
        price: parseInt(this.mobil.price),
        description: this.mobil.description,
      };
      const result = await this.createCar(params);
      if (!result) {
        console.log(result);
      } else {
        this.$router.go('mobil');
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
