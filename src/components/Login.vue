<template>
  <v-card dark color="primary">
    <v-card-text tag="center">
      <v-img max-height="75px" max-width="75px" src="../assets/fox-icon.png">
      </v-img>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="user" label="Login" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="8">
          <TextField v-model="password" type="password" label="Senha" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <Button @click="login()" title="Entrar" />
      <Button title="Registrar-se" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Button from "@/components/forms/Button.vue";
import TextField from "@/components/forms/TextField.vue";
import { VuexCommitName } from "@/enums/VuexCommitName";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

@Component({ components: { TextField, Button } })
export default class Login extends Vue {
  user = "";
  password = "";

  async login(): Promise<void> {
    const firebaseConfig = {
      apiKey: "AIzaSyBiXUVteCVs-FLwJ639dN_9EuJX_CBOglw",
      authDomain: "cine-fox-project.firebaseapp.com",
      projectId: "cine-fox-project",
      storageBucket: "cine-fox-project.appspot.com",
      messagingSenderId: "991842991079",
      appId: "1:991842991079:web:fdb6345a327ec66a1b9b42",
      measurementId: "G-VB6D49T5E6",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const usuarios = collection(db, "usuario");
    const t = await getDocs(usuarios);
    const cityList = t.docs.map((doc) => doc.data());

    console.log(cityList);

    if (this.user === "luis") {
      this.$store.commit(VuexCommitName.LOG_IN);
      this.$router.push("/main");
      this.$notify.success("Logado com sucesso!");
    } else {
      this.$notify.error("Login não encontrado!");
    }
  }
}
</script>
