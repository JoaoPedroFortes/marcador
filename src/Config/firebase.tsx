import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZml5VuNhfxez58v8jsXQu5ljOW99lgI0",
  authDomain: "agendador-de-servico.firebaseapp.com",
  projectId: "agendador-de-servico",
  storageBucket: "agendador-de-servico.appspot.com",
  messagingSenderId: "904487768079",
  appId: "1:904487768079:web:ef5af2a4fa1e5bf226d37a"
};


const firebase = initializeApp(firebaseConfig);

export default firebase;