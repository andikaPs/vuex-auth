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
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="productname"
                                placeholder="example"
                                :class="{
                                    'is-invalid': errors.name ?? false,
                                }"
                                v-model="name"
                            />
                            <label for="productname"
                                >Product name
                                <small class="text-danger">*</small></label
                            >
                            <div v-if="errors.name" class="invalid-feedback">
                                {{ errors.name }}
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="description"
                                placeholder="example"
                                v-model="description"
                            />
                            <label for="description">Description product</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="price"
                                placeholder="12.0"
                                v-model="price"
                                :class="{
                                    'is-invalid': errors.price ?? false,
                                }"
                            />
                            <label for="price"
                                >Price
                                <small class="text-danger">*</small></label
                            >
                            <div v-if="errors.price" class="invalid-feedback">
                                {{ errors.price }}
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
                        <button
                            class="btn btn-primary"
                            type="submit"
                            :disabled="isSubmitting"
                            v-if="isSubmitting"
                        >
                            <div
                                class="spinner-border spinner-border-sm"
                                role="status"
                            >
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            Loading...
                        </button>

                        <button
                            class="btn btn-primary"
                            type="submit"
                            :disabled="isSubmitting"
                            v-else
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useForm, useField } from 'vee-validate'
import { useStore } from 'vuex'
import * as yup from 'yup'
const store = useStore()

const schema = yup.object({
    name: yup.string().required().trim().min(3),
    description: yup.string().max(255),
    price: yup.number().required(),
})

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
})

const { value: name } = useField('name')
const { value: description } = useField('description')
const { value: price } = useField('price')

const errorsBackend = computed(() => store.state.products.errors)

const onSubmit = handleSubmit(async (values) => {
    const data = {
        ...values,
        slug: values.name.toLowerCase().split(' ').join('-'),
    }
    await store.dispatch('products/addProduct', data)
    if (await store.state.products.success) {
        Swal.fire({
            title: 'Success!',
            text: 'New Product added!',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        name.value = ''
        description.value = ''
        price.value = ''
    }
})
</script>

<style>
</style>