<template>
  <div class="container mt-4 custom-container">
    <h1 class="text-center mb-4 custom-title">Adicionar Habitacion</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" id="id" v-model="form.id" class="form-control" :class="{ 'is-invalid': errors.id }" placeholder="Ingrese el ID" />
        <div v-if="errors.id" class="invalid-feedback">{{ errors.id }}</div>
      </div>

      <div class="form-group">
        <label for="nombre">hotel ID:</label>
        <input type="text" id="nombre" v-model="form.hotelId" class="form-control" :class="{ 'is-invalid': errors.hotelId }" placeholder="Ingrese el ID del hotel" />
        <div v-if="errors.hotelId" class="invalid-feedback">{{ errors.hotelId }}</div>
      </div>

      <div class="form-group">
        <label for="direccion">Numero de habitacion:</label>
        <input type="text" id="direccion" v-model="form.numero_habitacion" class="form-control" :class="{ 'is-invalid': errors.numero_habitacion }" placeholder="Ingrese el numero de la habitacion" />
        <div v-if="errors.numero_habitacion" class="invalid-feedback">{{ errors.numero_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="num_habitaciones">Tipo de habitacion:</label>
        <input type="number" id="num_habitaciones" v-model="form.tipo_habitacion" class="form-control" :class="{ 'is-invalid': errors.tipo_habitacion }" placeholder="Ingrese el tipo de habitacion" />
        <div v-if="errors.tipo_habitacion" class="invalid-feedback">{{ errors.tipo_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="num_habitaciones">Estado de la habitacion:</label>
        <input type="number" id="num_habitaciones" v-model="form.estado_habitacion" class="form-control" :class="{ 'is-invalid': errors.estado_habitacion }" placeholder="Ingrese el estado de la habitacion" />
        <div v-if="errors.estado_habitacion" class="invalid-feedback">{{ errors.estado_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="num_habitaciones">Piso:</label>
        <input type="number" id="num_habitaciones" v-model="form.piso" class="form-control" :class="{ 'is-invalid': errors.piso }" placeholder="Ingrese el piso de la habitacion" />
        <div v-if="errors.piso" class="invalid-feedback">{{ errors.piso }}</div>
      </div>

      <div class="form-group">
        <label for="num_habitaciones">tiempo de limpieza:</label>
        <input type="number" id="num_habitaciones" v-model="form.tiempo_limpieza" class="form-control" :class="{ 'is-invalid': errors.tiempo_limpieza }" placeholder="Ingrese el tiempo de limpieza" />
        <div v-if="errors.tiempo_limpieza" class="invalid-feedback">{{ errors.tiempo_limpieza }}</div>
      </div>
      
      <button type="submit" class="btn btn-primary custom-btn-primary mt-3">
        <i class="fas fa-save"></i> Registrar
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HabitacionNew',
  data() {
    return {
      form: {
        id: '',
        nombre: '',
        direccion: '',
        num_habitaciones: ''
      },
      errors: {}
    };
  },
  methods: {
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
      }
    },
    save() {
      axios.post('/api/habitaciones', this.form)
        .then(response => {
          if (response.status === 201) {
            this.$emit('on-register', response.data);
            this.resetForm();
          }
        })
        .catch(error => console.error(error));
    },
    resetForm() {
      this.form = {
        id: '',
        nombre: '',
        direccion: '',
        num_habitaciones: ''
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>

</style>