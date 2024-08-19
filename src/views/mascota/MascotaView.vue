<template>
  <div class="container mt-4 custom-container">
    <Modal v-model:modelValue="showModalNuevo">
      <MascotaNew @on-register="onRegister($event)"/>
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <MascotaEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
    </Modal>
    <h1 class="custom-title">Lista de Mascotas</h1>
    <div class="mb-3">
      <button @click="showModalNuevo = true" class="btn btn-primary me-2 custom-btn-primary">
        <i class="fas fa-plus"></i> Nuevo
      </button>
      <div class="input-group custom-input-group">
        <input type="search" class="form-control" v-model="textToSearch" @input="buscar" placeholder="Buscar mascota">
        <button @click="buscar()" class="btn btn-light custom-btn-search">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="custom-thead">
        <tr>
          <th>No.</th>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Edad</th>
          <th>Dueño</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.especie }}</td>
          <td>{{ item.raza }}</td>
          <td>{{ item.edad }}</td>
          <td v-if="item.cliente">{{ item.cliente.nombre }}</td>
          <td v-else>No Cliente</td>
          <td>
            <button @click="irVacunas(item.id)" class="btn btn-info btn-sm me-2 custom-btn-info">
              <i class="fas fa-syringe"></i> Vacunas
            </button>
            <button @click="edit(item)" class="btn btn-dark btn-sm me-2 custom-btn-dark">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button @click="Eliminar(item.id)" class="btn btn-danger btn-sm custom-btn-danger">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import MascotaNew from './MascotaNewView.vue'
import MascotaEdit from './MascotaEditView.vue'
import axios from 'axios'

export default {
  name: 'Mascota',
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: []
    }
  },
  components: {
    Modal,
    MascotaNew,
    MascotaEdit
  },
  methods: {
    ...mapActions(['increment']),
    getList() {
      axios.get(`${this.baseUrl}/mascotas?_expand=cliente&q=${this.textToSearch}`)
        .then(response => {
          this.itemList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    Eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        axios.delete(`${this.baseUrl}/mascotas/${id}`)
          .then(() => {
            this.getList();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    buscar() {
      this.getList();
    },
    irVacunas(id) {
      this.$router.push(`/mascota/${id}/vacunas`);
    },
    onRegister() {
      this.getList();
      this.showModalNuevo = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    onUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Edición exitosa', 'info');
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
}
</script>

<style scoped>
.custom-container {
  background-color: #FEF3E2;
  padding: 20px;
  border-radius: 8px;
}

.custom-title {
  color: #606676;
}

.custom-btn-primary {
  background-color: #708871;
  border-color: #708871;
}

.custom-input-group {
  float: right;
  max-width: 300px;
}

.custom-btn-search {
  background-color: #BEC6A0;
  border-color: #BEC6A0;
  color: #FEF3E2;
}

.custom-thead {
  background-color: #606676;
  color: #FEF3E2;
}

.custom-btn-info {
  background-color: #BEC6A0;
  border-color: #BEC6A0;
}

.custom-btn-dark {
  background-color: #708871;
  border-color: #708871;
}

.custom-btn-danger {
  background-color: #606676;
  border-color: #606676;
}
</style>