<template>
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        Add new product
                        <small class="text-danger">(*) required</small>
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="productname"
                                placeholder="example"
                                :class="{
                                    'is-invalid': errors ? errors.name : false,
                                }"
                                v-model="formData.name"
                            />
                            <label for="productname"
                                >Product name
                                <small class="text-danger">*</small></label
                            >
                            <div v-if="errors" class="invalid-feedback">
                                <div v-for="error in errors.name" :key="error">
                                    {{ error }}
                                </div>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="description"
                                placeholder="example"
                                v-model="formData.description"
                            />
                            <label for="description">Description product</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="price"
                                placeholder="12.0"
                                v-model="formData.price"
                                :class="{
                                    'is-invalid': errors ? errors.price : false,
                                }"
                            />
                            <label for="price"
                                >Price
                                <small class="text-danger">*</small></label
                            >
                            <div v-if="errors" class="invalid-feedback">
                                <div v-for="error in errors.price" :key="error">
                                    {{ error }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { computed, onUpdated, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()

const formData = reactive({
    name: '',
    description: '',
    price: '',
})
const errors = computed(() => store.state.products.errors)

const handleSubmit = async () => {
    const data = {
        ...formData,
        slug: formData.name.toLowerCase().split(' ').join('-'),
    }
    await store.dispatch('products/addProduct', data)
    if (await store.state.products.success) {
        Swal.fire({
            title: 'Success!',
            text: 'New Product added!',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        formData.name = ''
        formData.description = ''
        formData.price = ''
        dispatch('getProducts')
    }
}
</script>

<style>
</style>