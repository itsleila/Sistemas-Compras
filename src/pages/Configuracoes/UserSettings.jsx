import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../infra/firebase';

export async function listarUsuarios() {
  const usuariosSnapshot = await getDocs(collection(db, 'users'));
  const usuarios = usuariosSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return usuarios;
}

export async function obterUsuario(id) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function excluirUsuario(id) {
  await deleteDoc(doc(db, 'users', id));
}

export async function atualizarUsuario(id, usuarioAtualizado) {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, usuarioAtualizado);
}
