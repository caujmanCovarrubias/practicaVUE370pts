<template>
  <div class="container mt-4 custom-container">
    <h1 class="text-center mb-4 custom-title">Editar Empleado</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" id="id" v-model="form.id" class="form-control" :class="{ 'is-invalid': errors.id }" placeholder="Ingrese el ID" />
        <div v-if="errors.id" class="invalid-feedback">{{ errors.id }}</div>
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input type="number" id="dni" v-model="form.dni" class="form-control" :class="{ 'is-invalid': errors.dni }" placeholder="Ingrese el DNI" />
        <div v-if="errors.dni" class="invalid-feedback">{{ errors.dni }}</div>
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.nombre" class="form-control" :class="{ 'is-invalid': errors.nombre }" placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>
    
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="form.correo" class="form-control" :class="{ 'is-invalid': errors.correo }" placeholder="Ingrese el correo" />
        <div v-if="errors.correo" class="invalid-feedback">{{ errors.correo }}</div>
      </div>

      <div class="form-group">
        <label for="telefono">Telefono:</label>
        <input type="tel" id="telefono" v-model="form.telefono" class="form-control" :class="{ 'is-invalid': errors.telefono }" placeholder="Ingrese el telefono" />
        <div v-if="errors.telefono" class="invalid-feedback">{{ errors.telefono }}</div>
      </div>

      <div class="form-group">
        <label for="fecha_contratacion">Fecha de contratacion:</label>
        <input type="date" id="fecha_contratacion" v-model="form.fecha_contratacion" class="form-control" :class="{ 'is-invalid': errors.fecha_contratacion }" placeholder="Ingrese la fecha de contratacion" />
        <div v-if="errors.fecha_contratacion" class="invalid-feedback">{{ errors.fecha_contratacion }}</div>
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
  name: 'EmpleadoEdit',
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
      if (!this.form.dni) this.errors.dni = 'El DNI es obligatorio.';
      if (!this.form.nombre) this.errors.nombre = 'El nombre es obligatorio.';

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          id: '',
          dni: '',
          nombre: '',
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