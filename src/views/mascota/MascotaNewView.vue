<template>
  <div class="container mt-4">
    <h1>Registrar Mascota</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group mb-3">
        <label for="cliente">Cliente:</label>
        <select id="cliente" v-model="form.clienteId" :class="{ 'is-invalid': errors.clienteId }" class="form-control">
          <option :value="cliente.id" v-for="cliente in clienteList" :key="cliente.id">{{ cliente.nombre }}</option>
        </select>
        <div v-if="errors.clienteId" class="invalid-feedback">{{ errors.clienteId }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="name">Nombre mascota:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }" class="form-control" placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="especie">Especie:</label>
        <select id="especie" v-model="form.especie" :class="{ 'is-invalid': errors.especie }" class="form-control">
          <option :value="especie" v-for="especie in especieList" :key="especie">{{ especie }}</option>
        </select>
        <div v-if="errors.especie" class="invalid-feedback">{{ errors.especie }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="raza">Raza:</label>
        <input type="text" id="raza" v-model="form.raza" :class="{ 'is-invalid': errors.raza }" class="form-control" placeholder="Ingrese la raza" />
        <div v-if="errors.raza" class="invalid-feedback">{{ errors.raza }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="edad">Edad (Años):</label>
        <input type="number" id="edad" v-model="form.edad" :class="{ 'is-invalid': errors.edad }" class="form-control" placeholder="Ingrese la edad" />
        <div v-if="errors.edad" class="invalid-feedback">{{ errors.edad }}</div>
      </div>

      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Registrar
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'MascotaNew',
  data() {
    return {
      clienteList: [],
      especieList: ['Perro', 'Gato'],
      form: {
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        clienteId: null
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) this.errors.nombre = 'El nombre es obligatorio.';
      if (!this.form.especie) this.errors.especie = 'La especie es obligatoria.';
      if (!this.form.raza) this.errors.raza = 'La raza es obligatoria.';
      if (!this.form.edad) this.errors.edad = 'La edad es obligatoria.';
      if (!this.form.clienteId) this.errors.clienteId = 'El Cliente es obligatorio.';

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.resetForm();
      }
    },
    save() {
      axios.post(`${this.baseUrl}/mascotas`, this.form)
        .then(response => {
          if (response.status === 201) {
            this.$emit('on-register', response.data);
          }
        })
        .catch(error => console.error(error));
    },
    getClienteList() {
      axios.get(`${this.baseUrl}/clientes`)
        .then(response => {
          this.clienteList = response.data;
        })
        .catch(error => console.error(error));
    },
    resetForm() {
      this.form = {
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        clienteId: null
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
  },
  mounted() {
    this.getClienteList();
  },
};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
