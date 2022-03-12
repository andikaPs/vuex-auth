<template>
    <main class="form-signin mt-4">
        <form @submit.prevent="onSubmit" autocomplete="off">
            <h1 class="h3 mb-3 fw-normal text-center">Please login</h1>

            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="email"
                    :class="{ 'is-invalid': errors.email ?? false }"
                />
                <label for="floatingInput">Email address</label>

                <div v-if="errors.email" class="invalid-feedback text-start">
                    {{ errors.email }}
                </div>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="password"
                    :class="{ 'is-invalid': errors.password ?? false }"
                />
                <label for="floatingPassword">Password</label>
                <div v-if="errors.password" class="invalid-feedback text-start">
                    {{ errors.password }}
                </div>
            </div>

            <button
                class="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
                :disabled="isSubmitting"
                v-if="isSubmitting"
            >
                <div class="spinner-border spinner-border-sm" role="status">
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
                Login
            </button>
            <p class="mt-5 mb-3 text-muted">
                Don't have an account?
                <router-link to="/register" class="text-decoration-none"
                    >Register now!</router-link
                >
            </p>
        </form>
    </main>
</template>

<script setup>
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
const store = useStore()
const router = useRouter()

const loginScema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
})

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: loginScema,
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const errorsBackend = computed(() => store.state.auth.errors)

onMounted(() => {
    store.commit('auth/setErrors', null)
})

const onSubmit = handleSubmit(async (values) => {
    await store.dispatch('auth/login', values)

    if (await !errorsBackend.value) {
        router.push('/products')
    }
})
</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>