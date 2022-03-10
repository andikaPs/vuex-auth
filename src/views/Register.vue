<template>
    <main class="form-signin mt-4">
        <form @submit.prevent="handleSubmit" autocomplete="off">
            <h1 class="h3 mb-3 fw-normal text-center">Register new account</h1>

            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingName"
                    placeholder="name"
                    v-model="formData.name"
                    :class="{ 'is-invalid': errors ? errors.name : false }"
                    autofocus
                />
                <label for="floatingName">Your Name</label>

                <div v-if="errors" class="invalid-feedback text-start">
                    <div v-for="error in errors.name" :key="error">
                        {{ error }}
                    </div>
                </div>
            </div>
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

            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPasswordConfirm"
                    placeholder="Password"
                    v-model="formData.password_confirmation"
                />
                <label for="floatingPasswordConfirm">Password Confirm</label>
            </div>

            <button
                class="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
                @click.prevent="handleSubmit"
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
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const errors = computed(() => store.state.auth.errors)
onMounted(() => {
    store.commit('auth/setErrors', null)
})

const handleSubmit = async () => {
    await store.dispatch('auth/register', formData)
    if (!errors.value) {
        Swal.fire({
            title: 'Success!',
            text: 'Registration successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
        router.push('/login')
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