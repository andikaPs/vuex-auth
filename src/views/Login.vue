<template>
    <main class="form-signin mt-4">
        <form @submit.prevent="handleSubmit" autocomplete="off">
            <h1 class="h3 mb-3 fw-normal text-center">Please login</h1>

            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="formData.email"
                    :class="{ 'is-invalid': errors ? errors.email : false }"
                />
                <label for="floatingInput">Email address</label>

                <div v-if="errors" class="invalid-feedback text-start">
                    <div v-for="error in errors.email" :key="error">
                        {{ error }}
                    </div>
                </div>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="formData.password"
                    :class="{ 'is-invalid': errors ? errors.password : false }"
                />
                <label for="floatingPassword">Password</label>
                <div v-if="errors" class="invalid-feedback text-start">
                    <div v-for="error in errors.password" :key="error">
                        {{ error }}
                    </div>
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
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
import { reactive } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const formData = reactive({
    email: '',
    password: '',
})

const errors = computed(() => store.state.auth.errors)
const isLogin = computed(() => store.state.auth.isLoggedIn)

onMounted(() => {
    store.commit('auth/setErrors', null)
})

const handleSubmit = async () => {
    await store.dispatch('auth/login', formData)

    if (await !errors.value) {
        Swal.fire({
            title: 'Please Wait!',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                router.push('/products')
            }
        })
    }
}
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