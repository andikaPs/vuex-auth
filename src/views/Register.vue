<template>
    <main class="form-signin mt-4">
        <form @submit.prevent="onSubmit" autocomplete="off">
            <h1 class="h3 mb-3 fw-normal text-center">Register new account</h1>

            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingName"
                    placeholder="name"
                    v-model="name"
                    :class="{ 'is-invalid': errors.name ?? false }"
                    autofocus
                />
                <label for="floatingName">Your Name</label>

                <div v-if="errors.name" class="invalid-feedback text-start">
                    {{ errors.name }}
                </div>
            </div>
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

                <div v-if="errorsBackend" class="text-start text-danger">
                    <div v-for="error in errorsBackend.email" :key="error">
                        {{ error }}
                    </div>
                </div>
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

            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPasswordConfirm"
                    placeholder="Password"
                    v-model="password_confirmation"
                    :class="{
                        'is-invalid': errors.password_confirmation ?? false,
                    }"
                />
                <label for="floatingPasswordConfirm">Password Confirm</label>
                <div
                    v-if="errors.password_confirmation"
                    class="invalid-feedback text-start"
                >
                    {{ errors.password_confirmation }}
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
                Register
            </button>
            <p class="mt-5 mb-3 text-muted">
                Already have an account?
                <router-link to="/login" class="text-decoration-none"
                    >Login.</router-link
                >
            </p>
        </form>
    </main>
</template>

<script setup>
import { computed, onMounted } from '@vue/runtime-core'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as yup from 'yup'
const store = useStore()
const router = useRouter()

const registerSchema = yup.object({
    name: yup.string().required().min(3).trim(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    password_confirmation: yup
        .string()
        .required()
        .min(6)
        .oneOf([yup.ref('password'), null], "Password doesn't match!"),
})

const { errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: registerSchema,
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: password_confirmation } = useField('password_confirmation')

const errorsBackend = computed(() => store.state.auth.errors)
onMounted(() => {
    store.commit('auth/setErrors', null)
})

const onSubmit = handleSubmit(async (values) => {
    await store.dispatch('auth/register', values)
    if (await !errorsBackend.value) {
        Swal.fire({
            title: 'Success!',
            text: 'Registration successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        router.push('/login')
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

.form-signin input[type='text'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
    margin-bottom: -1px;
    /* margin-bottom: 10px; */
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>