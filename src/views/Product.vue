<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <h3 class="text-muted mb-3">
                    Edit Product
                    <small class="fs-6 text-danger">(*) required</small>
                </h3>
                <form @submit.prevent="handleSubmit">
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
                            >Price <small class="text-danger">*</small></label
                        >
                        <div v-if="errors" class="invalid-feedback">
                            <div v-for="error in errors.price" :key="error">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { computed, onMounted, onUpdated, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const props = defineProps({
    id: String,
})
const formData = reactive({
    name: '',
    description: '',
    price: '',
})

const errors = computed(() => store.state.products.errors)
const product = computed(() => store.getters['products/getProduct'])
setTimeout(() => {
    formData.name = product.value.name
    formData.description = product.value.description
    formData.price = product.value.price
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
console.log(props.id)

const handleSubmit = async () => {
    const data = {
        ...formData,
        slug: formData.name.toLowerCase().split(' ').join('-'),
    }

    await store.dispatch('products/updateProduct', { data: data, id: props.id })
    if (await store.state.products.success) {
        Swal.fire({
            title: 'Success!',
            text: 'Product change successfully!',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        formData.name = ''
        formData.description = ''
        formData.price = ''
        router.push('/products')
    }
}
</script>

<style>
</style>