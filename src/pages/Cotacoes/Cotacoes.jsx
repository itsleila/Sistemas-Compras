import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../infra/firebase';

export async function inserirCotacoes(novoCotacoes) {
  const docRef = await addDoc(collection(db, 'cotacoes'), novoCotacoes);
  return docRef.id;
}

export async function listarCotacoes() {
  let retorno;
  await getDocs(collection(db, 'cotacoes')).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterCotacao(id) {
  const docRef = doc(db, 'contacoes', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function excluirCotacao(id) {
  await deleteDoc(doc(db, 'cotacoes', id));
}

export async function atualizarCotacao(id, cotacaoAtualizada) {
  const docRef = doc(db, 'cotacoes', id);
  await updateDoc(docRef, cotacaoAtualizada);
}
