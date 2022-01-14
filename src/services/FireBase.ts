import { FirebaseApp, initializeApp } from "firebase/app";
import {
  addDoc,
  getDocs,
  Firestore,
  collection,
  getFirestore,
} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import UserModel from "@/models/UserModel";
import ResultRequest from "@/models/RequestError";

const FIRE_BASE_CONFIG = {
  apiKey: "AIzaSyBiXUVteCVs-FLwJ639dN_9EuJX_CBOglw",
  authDomain: "cine-fox-project.firebaseapp.com",
  projectId: "cine-fox-project",
  storageBucket: "cine-fox-project.appspot.com",
  messagingSenderId: "991842991079",
  appId: "1:991842991079:web:fdb6345a327ec66a1b9b42",
  measurementId: "G-VB6D49T5E6",
};

export default class FireBaseService {
  fireBaseApp: FirebaseApp;

  constructor() {
    this.fireBaseApp = initializeApp(FIRE_BASE_CONFIG);
  }

  getDb(): Firestore {
    return getFirestore(this.fireBaseApp);
  }

  async signIn(user: UserModel): Promise<ResultRequest<string>> {
    const result: ResultRequest<string> = new ResultRequest("");

    try {
      const auth = getAuth();
      const signResult = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      console.log(signResult);
      result.message = "Logado com sucesso!";
      result.data = ["TOKEN"];
    } catch (error) {
      const err = error as Error;
      result.message = err.message;
      result.error = true;
    }

    return result;
  }

  async createNewAccount(user: UserModel): Promise<ResultRequest<void>> {
    const result: ResultRequest<void> = new ResultRequest("");

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      result.message = "Registrado com sucesso!";
    } catch (error) {
      const err = error as Error;
      result.message = err.message;
      result.error = true;
    }

    return result;
  }

  async getAllDocs<T>(collectionName: string): Promise<ResultRequest<T>> {
    const result = new ResultRequest<T>("");

    const db: Firestore = this.getDb();

    const collectionDocs = collection(db, collectionName);
    const docs = await getDocs(collectionDocs);
    result.data = docs.docs.map((doc) => doc.data() as T);

    return result;
  }

  async addDoc<T>(collectionName: string, doc: T): Promise<ResultRequest<T>> {
    const result = new ResultRequest<T>("");

    try {
      const db: Firestore = this.getDb();
      await addDoc(
        collection(db, collectionName),
        JSON.parse(JSON.stringify(doc))
      );
    } catch (error) {
      const err = error as Error;
      result.message = err.message;
      result.error = true;
    }

    return result;
  }
}
