<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link to="/" class="navbar-brand">Vuex Auth</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <div class="d-lg-flex" v-if="!isLogin">
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link"
                                >Login</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link to="/register" class="nav-link"
                                >Register</router-link
                            >
                        </li>
                    </div>
                    <div v-else class="d-lg-flex">
                        <li class="nav-item">
                            <router-link to="/products" class="nav-link"
                                >Posts</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <form @submit.prevent="logout">
                                <button class="nav-link bg-primary border-0">
                                    Logout
                                </button>
                            </form>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const isLogin = computed(() => store.state.auth.isLogin)

onMounted(() => {
    if (localStorage.getItem('authToken')) {
        store.commit('auth/setIsLogin', true)
    }
})

const logout = () => {
    store.dispatch('auth/logout')

    Swal.fire({
        title: 'Please Wait!',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            router.push('/login')
        }
    })
}
</script>

<style>
</style>