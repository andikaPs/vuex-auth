<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-5" v-if="product">
                <h3 class="text-muted mb-3">
                    Edit Product
                    <small class="fs-6 text-danger">(*) required</small>
                </h3>
                <form @submit.prevent="onSubmit">
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
                            >Price <small class="text-danger">*</small></label
                        >
                        <div v-if="errors.price" class="invalid-feedback">
                            {{ errors.price }}
                        </div>
                    </div>
                    <button
                        class="w-100 btn btn-lg btn-primary mt-3"
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
                        class="w-100 btn btn-lg btn-primary mt-3"
                        type="submit"
                        :disabled="isSubmitting"
                        v-else
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
const store = useStore()
const router = useRouter()
const props = defineProps({
    id: String,
})

const schema = yup.object({
    name: yup.string().required().trim().min(3),
    description: yup.string().trim(),
    price: yup.number().required(),
})

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: schema,
})

const { value: name } = useField('name')
const { value: description } = useField('description')
const { value: price } = useField('price')
const errorsBackend = computed(() => store.state.products.errors)
const product = computed(() => store.getters['products/getProduct'])
setTimeout(() => {
    name.value = product.value.name
    description.value = product.value.description ?? ''
    price.value = product.value.price
}, 3000)
Swal.fire({
    title: 'Please Wait!',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
    },
})

onMounted(() => {
    store.dispatch('products/getProductById', props.id)
})

const onSubmit = handleSubmit(async (values) => {
    const data = {
        ...values,
        slug: values.name.toLowerCase().split(' ').join('-'),
    }
    console.log(data)
    await store.dispatch('products/updateProduct', { data: data, id: props.id })
    if (await store.state.products.success) {
        Swal.fire({
            title: 'Success!',
            text: 'Product change successfully!',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        router.push('/products')
    }
})
</script>

<style>
</style>