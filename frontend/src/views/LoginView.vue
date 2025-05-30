<script setup lang="ts">
import ErrorOverlay from "@/components/ErrorOverlay.vue";
import TextField from "@/components/TextField.vue";
import { makeJsonHeader, PUBLIC_API } from "@/services/main";
import { onMounted, ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");

const loading = ref(false);
const errorTitle = ref("");
const errorDescription = ref("");

const loginButtonRef = useTemplateRef("loginButton");

onMounted(() => {
  // Register a key listener that presses the login button when entered.
  document.addEventListener("keypress", (e) => {
    if (e.key == "Enter" || e.key == "Return") {
      if (errorTitle.value) {
        errorTitle.value = "";
      } else {
        loginButtonRef.value?.click();
      }
    }
  });
});

async function login() {
  loading.value = true;

  const res = await fetch(`${PUBLIC_API}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    
    headers: makeJsonHeader(),
    body: JSON.stringify({ username: username.value, password: password.value }),
  });
  loading.value = false;

  switch (res.status) {
    case 400:
      errorTitle.value = "Invalid input";
      errorDescription.value = "The input fields do not have data inputted properly.";
      break;
    case 404:
      errorTitle.value = "Username not found";
      errorDescription.value = "The username you inputted does not belong to any employees.";
      break;
    case 403:
      errorTitle.value = "Wrong password";
      errorDescription.value = "The password you provided was incorrect.";
      break;
    case 200:
      router.replace({ path: "/" });
      break;
  }
}
</script>

<template>
  <ErrorOverlay v-model:error="errorTitle" v-model:message="errorDescription" />

  <div
    class="border-live-olive bg-almost-white mt-32 flex w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-[1px] px-4 py-8 duration-200 lg:gap-12 lg:px-8 lg:py-12"
  >
    <h1 class="text-2xl font-bold">Sign In</h1>

    <div class="flex w-full flex-col gap-4">
      <TextField label="Username" input="text" v-model="username" />
      <TextField label="Password" input="password" v-model="password" />
    </div>

    <div class="flex w-full flex-col gap-4">
      <button
        class="bg-moss hover:bg-leaf h-16 w-full cursor-pointer rounded-lg font-bold tracking-widest text-white duration-200"
        @click="login"
        ref="loginButton"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>
