<template>
  <div class="container mt-4 custom-container">
    <Modal v-model:modelValue="showModalNew">
      <EmpleadoNewView @on-register="onRegister($event)"/>
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <EmpleadoEditView @on-update="onUpdate($event)" :item="itemToEdit"/>
    </Modal>
    <h1 class="custom-title">Empleados habilitados</h1>
    <div class="mb-3 d-flex justify-content-between">
      <button @click="showModalNew = true" class="btn btn-primary me-2 custom-btn-primary">
        <i class="fas fa-plus"></i> Nuevo
      </button>
      <div class="input-group custom-input-group">
        <input type="search" class="form-control" v-model="textToSearch" @input="buscar" placeholder="Buscar empleado">
        <button @click="onSearch()" class="btn btn-light custom-btn-search">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="custom-thead">
        <tr>
          <th>No.</th>
          <th>Id</th>
          <th>Dni</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Fecha Contratacion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.dni }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.correo }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.fecha_contratacion }}</td>
          <td>
            <button @click="onEdit(item)" class="btn btn-dark btn-sm me-2 custom-btn-dark">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button @click="onDelete(item)" class="btn btn-danger btn-sm custom-btn-danger">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Modal from '../../components/Modal.vue';
import EmpleadoNewView from './EmpleadoNewView.vue';
import EmpleadoEditView from './EmpleadoEditView.vue';
import axios from 'axios';

export default {
  name: 'Empleado',
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
    EmpleadoNewView,
    EmpleadoEditView
  },
  methods: {
    ...mapActions(['increment']),
    getList() {
      axios.get(`${this.baseUrl}/empleados`)
        .then(response => {
          this.itemList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    onEdit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    onSearch() {
  if (this.textToSearch.trim() === '') {
    // Si el campo de búsqueda está vacío, recargamos toda la lista
    this.getList();
  } else {
    // Filtramos la lista actual de elementos según el texto de búsqueda
    this.itemList = this.itemList.filter(empleado => 
      empleado.nombre.toLowerCase().includes(this.textToSearch.toLowerCase()) || 
      empleado.correo.toLowerCase().includes(this.textToSearch.toLowerCase()) || 
      empleado.telefono.toLowerCase().includes(this.textToSearch.toLowerCase())
    );
  }
  },
    onDelete(item) {
      if (confirm("¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.")) {
        axios.delete(`${this.baseUrl}/empleados/${item.id}`)
          .then(() => {
            this.getList();
            this.$toast.show("El registro ha sido eliminado con éxito", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    onRegister() {
      this.getList();
      this.showModalNew = false;
      this.$toast.show('El registro se ha realizado con éxito', 'success');
    },
    onUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('La edición se ha realizado con éxito', 'info');
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
    this.getList();
  }
};
</script>

<style scoped>

</style>