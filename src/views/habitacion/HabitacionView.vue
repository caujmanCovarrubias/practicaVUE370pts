<template>
  <div class="container mt-4 custom-container">
    <Modal v-model:modelValue="showModalNew">
      <HabitacionNewView @on-register="handleRegister" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <HabitacionEditView @on-update="handleUpdate" :item="itemToEdit" />
    </Modal>
    <h1 class="custom-title">Habitaciones habilitadas</h1>
    <div class="mb-3 d-flex justify-content-between">
      <button @click="showModalNew = true" class="btn btn-primary me-2 custom-btn-primary">
        <i class="fas fa-plus"></i> Nuevo
      </button>
      <div class="input-group custom-input-group">
        <input type="search" class="form-control" v-model="textToSearch" placeholder="Buscar habitación por número, estado o tipo">
        <button @click="handleSearch" class="btn btn-light custom-btn-search">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="custom-thead">
        <tr>
          <th>No.</th>
          <th>Id</th>
          <th>Hotel</th>
          <th>Número</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Piso</th>
          <th>Limpieza (min)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.hotelId }}</td>
          <td>{{ item.numero_habitacion }}</td>
          <td>{{ item.tipo_habitacion }}</td>
          <td>{{ item.estado_habitacion }}</td>
          <td>{{ item.piso }}</td>
          <td>{{ item.tiempo_limpieza }}</td>
          <td>
            <button @click="handleEdit(item)" class="btn btn-dark btn-sm me-2 custom-btn-dark">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button @click="handleDelete(item)" class="btn btn-danger btn-sm custom-btn-danger">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Modal from '../../components/Modal.vue';
import HabitacionNewView from './HabitacionNewView.vue';
import HabitacionEditView from './HabitacionEditView.vue';
import axios from 'axios';

export default {
  name: 'Habitacion',
  data() {
    return {
      showModalNew: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: []
    };
  },
  components: {
    Modal,
    HabitacionNewView,
    HabitacionEditView
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    },
    filteredItems() {
      if (this.textToSearch.trim() === '') {
        return this.itemList;
      }
      const searchLower = this.textToSearch.toLowerCase();
      return this.itemList.filter(habitacion =>
        habitacion.numero_habitacion.toLowerCase().includes(searchLower) ||
        habitacion.tipo_habitacion.toLowerCase().includes(searchLower) ||
        habitacion.estado_habitacion.toLowerCase().includes(searchLower)
      );
    }
  },
  methods: {
    getList() {
      axios.get(`${this.baseUrl}/habitaciones`)
        .then(response => {
          this.itemList = response.data;
        })
        .catch(error => console.error(error));
    },
    handleEdit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    handleSearch() {
      this.getList();
    },
    handleDelete(item) {
      if (confirm("¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.")) {
        axios.delete(`${this.baseUrl}/habitaciones/${item.id}`)
          .then(() => {
            this.getList();
            this.$toast.show("El registro ha sido eliminado con éxito", "danger");
          })
          .catch(error => console.error(error));
      }
    },
    handleRegister() {
      this.getList();
      this.showModalNew = false;
      this.$toast.show('El registro se ha realizado con éxito', 'success');
    },
    handleUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('La edición se ha realizado con éxito', 'info');
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
/* Añadir estilos si es necesario */
</style>