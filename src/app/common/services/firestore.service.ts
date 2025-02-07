import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  DocumentData,
  WithFieldValue,
  UpdateData,
  getDocs,
  addDoc,
  CollectionReference,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';




// Convertidor genérico para Firestore
const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: any) => snapshot.data() as T
});

const docWithConverter = <T>(firestore: Firestore, path: string) =>
  doc(firestore, path).withConverter(converter<T>());

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor(
    // private firestore: Firestore,
    private auth: Auth
  ) {}


  getFirestoreInstance(): Firestore {
    return this.firestore;
  }

  getDocument<T>(enlace: string): Promise<DocumentData> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return getDoc(document);
  }

  getDocumentChanges<T>(enlace: string): Observable<T> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return docData(document) as Observable<T>;
  }

  getCollectionChanges<T>(path: string): Observable<T[]> {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection, { idField: 'id' }) as Observable<T[]>;
  }

  createDocument<T>(data: T, enlace: string): Promise<void> {
    const document = docWithConverter<T>(this.firestore, enlace);
    return setDoc(document, data);
  }

  async createDocumentWithAutoId<T>(data: T, enlace: string): Promise<void> {
    const itemCollection = collection(this.firestore, enlace);
    const newDocRef = doc(itemCollection).withConverter(converter<T>());
    await setDoc(newDocRef, data);
  }

  // async updateDocument<T>(data: UpdateData<T>, enlace: string, idDoc: string): Promise<void> {
  //   const document = docWithConverter<T>(this.firestore, `${enlace}/${idDoc}`);
  //   return updateDoc(document, data);
  // }

  deleteDocumentID(enlace: string, idDoc: string): Promise<void> {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: DocumentReference): Promise<void> {
    return deleteDoc(ref);
  }

  createIdDoc(): string {
    return uuidv4();
  }

  getProductos(): Observable<any[]> {
    const productsCollection = collection(this.firestore, 'products');
    const productsQuery = query(productsCollection, where('stock', '>', 1));
    return collectionData(productsQuery, { idField: 'id' });
  }

  getProductoById(id: string): Observable<any> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return docData(productDocRef, { idField: 'id' });
  }


  async addProduct(product: any): Promise<void> {
    // Genera un ID único
    const id = this.createIdDoc();

    // Crea la referencia al documento con el ID generado
    const productDocRef = doc(this.firestore, `products/${id}`);

    // Incluye el ID generado dentro del producto y guarda el documento
    await setDoc(productDocRef, { ...product, id });
  }



  // Obtener marcas
  getMarcas(): Observable<any[]> {
    const marcasCollection = collection(this.firestore, 'marcas');
    return collectionData(marcasCollection, { idField: 'id' });
  }

  // Obtener categorías
  getCategorias(): Observable<any[]> {
    const categoriasCollection = collection(this.firestore, 'categorias');
    return collectionData(categoriasCollection, { idField: 'id' });
  }

  
}
