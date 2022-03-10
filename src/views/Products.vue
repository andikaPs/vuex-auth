<template>
    <div class="container my-3">
        <div class="d-flex justify-content-between">
            <h5 class="text-muted">List Products</h5>
            <!-- Button trigger modal -->
            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Add new product
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="product.id">
                        <td>{{ ++index }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>$ {{ product.price }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <router-link
                                    :to="{
                                        name: 'Product',
                                        params: { id: product.id },
                                    }"
                                    class="btn btn-warning"
                                    >Edit</router-link
                                >
                                <button
                                    @click="handleDelete(product.id)"
                                    class="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ModalProduct />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import ModalProduct from '../components/ModalProduct.vue'
import { useStore } from 'vuex'

const store = useStore()
const products = computed(() => store.state.products.products)
const user = store.getters['auth/user']

onMounted(() => {
    store.dispatch('products/getProducts')
})

const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be delete this product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            store.dispatch('products/deleteProduct', id)
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success')
        }
    })
}
</script>

<style>
</style>