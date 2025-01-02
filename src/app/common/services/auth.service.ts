
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserI } from '../models/users.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {



  user$: Observable<any>;
  afs: any;
 constructor(private afAuth: AngularFireAuth, private router: Router,private auth: Auth   ) {
    this.user$ = this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return {
            id: user.uid,
            nombre: user.displayName?.split(' ')[0] || '',
            apellido: user.displayName?.split(' ')[1] || '',
            email: user.email || '',
            password: ''
          };
        } else {
          return null;
        }
      })
    );
  }

  async register(user: UserI) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      await result.user?.updateProfile({
        displayName: `${user.nombre} ${user.apellido}`
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }



  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error during logout:', error);
    }
  }



   async getAllUsers(): Promise<UserI[]> {
    try {
      const userRecords = await this.afs.collection('users').get().toPromise();
      const users = userRecords.docs.map((doc: { id: any; data: () => any; }) => ({
        id: doc.id,
        ...doc.data()
      })) as UserI[];
      console.log('Usuarios obtenidos:', users);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }



 // Método para iniciar sesión con correo y contraseña
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Guardar la información del usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  }

 async signInWithGoogle() {
  try {
    console.log('Inicializando GoogleAuth...');
    // Asegúrate de que el clientId esté en el archivo google-services.json y concuerde con el de Firebase
    await GoogleAuth.initialize({
      clientId: '691492663327-g6nmk7gadthb3r15e68al3klk41emvt7.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    console.log('GoogleAuth inicializado correctamente.');

    console.log('Intentando iniciar sesión con Google...');
    const googleUser = await GoogleAuth.signIn();
    console.log('Respuesta de Google sign-in:', googleUser);

    // Verifica si se obtuvo un usuario y la autenticación
    if (!googleUser || !googleUser.authentication) {
      throw new Error('No se obtuvo la autenticación completa del usuario de Google.');
    }

    // Usar idToken o accessToken según lo que devuelva GoogleAuth
    const token = googleUser.authentication.idToken || googleUser.authentication.accessToken;
    if (!token) {
      throw new Error('No se obtuvo un token de autenticación válido de Google.');
    }

    console.log('Creando credencial de Firebase con el token de Google...');
    const credential = firebase.auth.GoogleAuthProvider.credential(token);

    console.log('Iniciando sesión en Firebase con la credencial...');
    const userCredential = await this.afAuth.signInWithCredential(credential);
    console.log('Respuesta de Firebase sign-in:', userCredential);



    console.log('Usuario inició sesión correctamente con Google:', userCredential);
    return userCredential;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }
}



  // getUser() {
  //   return JSON.parse(localStorage.getItem('user') || '{}');
  // }


// Devuelve un observable con el estado de autenticación
  getUser(): Observable<any> {
    return this.afAuth.authState; // Esto devuelve un observable del estado de autenticación
  }

}
