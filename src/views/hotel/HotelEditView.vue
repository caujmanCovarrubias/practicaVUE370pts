<template>
  <div class="container mt-4 custom-container">
    <h1 class="text-center mb-4 custom-title">Editar Hotel</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" id="id" v-model="form.id" class="form-control" :class="{ 'is-invalid': errors.id }" placeholder="Ingrese el ID" />
        <div v-if="errors.id" class="invalid-feedback">{{ errors.id }}</div>
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.nombre" class="form-control" :class="{ 'is-invalid': errors.nombre }" placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="form.direccion" class="form-control" :class="{ 'is-invalid': errors.direccion }" placeholder="Ingrese la dirección" />
        <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
      </div>

      <div class="form-group">
        <label for="num_habitaciones">Número de Habitaciones:</label>
        <input type="number" id="num_habitaciones" v-model="form.num_habitaciones" class="form-control" :class="{ 'is-invalid': errors.num_habitaciones }" placeholder="Ingrese el número de habitaciones" />
        <div v-if="errors.num_habitaciones" class="invalid-feedback">{{ errors.num_habitaciones }}</div>
      </div>

      <button type="submit" class="btn btn-primary custom-btn-primary mt-3">
        <i class="fas fa-save"></i> Guardar
      </button>

    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'HotelEdit',
  props: ['item'],
  data() {
    return {
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.id) this.errors.id = 'El ID es obligatorio.';
      if (!this.form.nombre) this.errors.nombre = 'El nombre es obligatorio.';
      if (!this.form.direccion) this.errors.direccion = 'La dirección es obligatoria.';
      if (!this.form.num_habitaciones) this.errors.num_habitaciones = 'El número de habitaciones es obligatorio.';

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          id: '',
          nombre: '',
          direccion: '',
          num_habitaciones: ''
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/hoteles/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({}, this.item);
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>