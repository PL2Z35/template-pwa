
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAyOzZqEqjbcVXdhtMC63ehUSLcuckUd7c",
    authDomain: "hitchme-7f0e9.firebaseapp.com",
    projectId: "hitchme-7f0e9",
    storageBucket: "hitchme-7f0e9.appspot.com",
    messagingSenderId: "365654774246",
    appId: "1:365654774246:web:c81761bcf480e617fd4627",
    measurementId: "G-E98K2MJNTF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;