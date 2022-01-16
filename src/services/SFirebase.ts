import { FirebaseApp, initializeApp } from "firebase/app";
import {
  doc,
  addDoc,
  setDoc,
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
import { MUser } from "@/models/MUser";
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

export class SFirebase {
  fireBaseApp: FirebaseApp;

  constructor() {
    this.fireBaseApp = initializeApp(FIRE_BASE_CONFIG);
  }

  getDb(): Firestore {
    return getFirestore(this.fireBaseApp);
  }

  async signIn(userParam: MUser): Promise<MResultRequest<IUserCredential>> {
    const result: MResultRequest<IUserCredential> = new MResultRequest("");

    try {
      const FIRE_AUTH = getAuth();
      const FIRE_USER_CREDENCIAL = await signInWithEmailAndPassword(
        FIRE_AUTH,
        userParam.email,
        userParam.password
      );

      const INTERFACE_USER_CREDENCIAL: IUserCredential = JSON.parse(
        JSON.stringify(FIRE_USER_CREDENCIAL)
      );
      result.message = "Logado com sucesso!";
      result.data = INTERFACE_USER_CREDENCIAL;
    } catch (error) {
      const ERROR = error as Error;
      result.message = ERROR.message;
      result.error = true;
    }

    return result;
  }

  async createNewAccount(
    user: MUser
  ): Promise<MResultRequest<IUserCredential>> {
    const result: MResultRequest<IUserCredential> = new MResultRequest("");

    try {
      const auth = getAuth();
      const FIRE_USER_CREDENCIAL = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const INTERFACE_USER_CREDENCIAL: IUserCredential = JSON.parse(
        JSON.stringify(FIRE_USER_CREDENCIAL)
      );
      result.message = "Registrado com sucesso!";
      result.data = INTERFACE_USER_CREDENCIAL;
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

  async setDoc<T>(
    collectionParam: string,
    docParam: T,
    docIdParam: string
  ): Promise<MResultRequest<T>> {
    const result = new MResultRequest<T>("");

    try {
      const db: Firestore = this.getDb();
      await setDoc(
        doc(db, collectionParam, docIdParam),
        JSON.parse(JSON.stringify(docParam))
      );
    } catch (error) {
      const err = error as Error;
      result.message = err.message;
      result.error = true;
    }

    return result;
  }
}
