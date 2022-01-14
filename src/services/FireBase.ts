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
import {MUser} from "@/models/MUser";
import { MResultRequest } from "@/models/MResultRequest";
import IUserCredential from "@/interface/IUserCredential";

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

  async signIn(userParam: MUser): Promise<MResultRequest<string>> {
    const result: MResultRequest<string> = new MResultRequest("");

    try {
      const fireAuth = getAuth();
      const fireUser = await signInWithEmailAndPassword(
        fireAuth,
        userParam.email,
        userParam.password
      );

      const userCredencials: IUserCredential = JSON.parse(
        JSON.stringify(fireUser)
      );
      result.message = "Logado com sucesso!";
      result.data = userCredencials.user.apiKey;
    } catch (error) {
      const e = error as Error;
      result.message = e.message;
      result.error = true;
    }

    return result;
  }

  async createNewAccount(user: MUser): Promise<MResultRequest<void>> {
    const result: MResultRequest<void> = new MResultRequest("");

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

  async getAllDocs<T>(collectionName: string): Promise<MResultRequest<T>> {
    const result = new MResultRequest<T>("");

    const db: Firestore = this.getDb();

    const collectionDocs = collection(db, collectionName);
    const docs = await getDocs(collectionDocs);
    result.data = docs.docs.map((doc) => doc.data() as T);

    return result;
  }

  async addDoc<T>(collectionName: string, doc: T): Promise<MResultRequest<T>> {
    const result = new MResultRequest<T>("");

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
