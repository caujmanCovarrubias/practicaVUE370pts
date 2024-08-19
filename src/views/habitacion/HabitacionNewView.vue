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
        <label for="hotelId">Hotel ID:</label>
        <input type="text" id="hotelId" v-model="form.hotelId" class="form-control" :class="{ 'is-invalid': errors.hotelId }" placeholder="Ingrese el ID del hotel" />
        <div v-if="errors.hotelId" class="invalid-feedback">{{ errors.hotelId }}</div>
      </div>

      <div class="form-group">
        <label for="numero_habitacion">Número de habitación:</label>
        <input type="text" id="numero_habitacion" v-model="form.numero_habitacion" class="form-control" :class="{ 'is-invalid': errors.numero_habitacion }" placeholder="Ingrese el número de la habitación" />
        <div v-if="errors.numero_habitacion" class="invalid-feedback">{{ errors.numero_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="tipo_habitacion">Tipo de habitación:</label>
        <input type="text" id="tipo_habitacion" v-model="form.tipo_habitacion" class="form-control" :class="{ 'is-invalid': errors.tipo_habitacion }" placeholder="Ingrese el tipo de habitación" />
        <div v-if="errors.tipo_habitacion" class="invalid-feedback">{{ errors.tipo_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="estado_habitacion">Estado de la habitación:</label>
        <input type="text" id="estado_habitacion" v-model="form.estado_habitacion" class="form-control" :class="{ 'is-invalid': errors.estado_habitacion }" placeholder="Ingrese el estado de la habitación" />
        <div v-if="errors.estado_habitacion" class="invalid-feedback">{{ errors.estado_habitacion }}</div>
      </div>

      <div class="form-group">
        <label for="piso">Piso:</label>
        <input type="number" id="piso" v-model="form.piso" class="form-control" :class="{ 'is-invalid': errors.piso }" placeholder="Ingrese el piso de la habitación" />
        <div v-if="errors.piso" class="invalid-feedback">{{ errors.piso }}</div>
      </div>

      <div class="form-group">
        <label for="tiempo_limpieza">Tiempo de limpieza:</label>
        <input type="number" id="tiempo_limpieza" v-model="form.tiempo_limpieza" class="form-control" :class="{ 'is-invalid': errors.tiempo_limpieza }" placeholder="Ingrese el tiempo de limpieza (minutos)" />
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
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'HabitacionNew',
  data() {
    return {
      form: { ...this.item },
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.id) this.errors.id = 'El ID es obligatorio.';
      if (!this.form.hotelId) this.errors.hotelId = 'El ID del hotel es obligatorio.';
      if (!this.form.numero_habitacion) this.errors.numero_habitacion = 'El número de habitación es obligatorio.';
      if (!this.form.tipo_habitacion) this.errors.tipo_habitacion = 'El tipo de habitación es obligatorio.';
      if (!this.form.estado_habitacion) this.errors.estado_habitacion = 'El estado de la habitación es obligatorio.';
      if (!this.form.piso) this.errors.piso = 'El piso es obligatorio.';
      if (!this.form.tiempo_limpieza) this.errors.tiempo_limpieza = 'El tiempo de limpieza es obligatorio.';

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      axios.post(`${this.baseUrl}/habitaciones`, this.form)
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
        hotelId: '',
        numero_habitacion: '',
        tipo_habitacion: '',
        estado_habitacion: '',
        piso: '',
        tiempo_limpieza: ''
      };
      this.errors = {};
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  }
};
</script>

<style scoped>

</style>