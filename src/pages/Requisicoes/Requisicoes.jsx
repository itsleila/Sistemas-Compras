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

export async function inserirRequisicoes(novoRequisicoes) {
  const docRef = await addDoc(collection(db, 'requisicoes'), novoRequisicoes);
  return { id: docRef.id, ...novoRequisicoes };
}

export async function listarRequisicoes() {
  const querySnapshot = await getDocs(collection(db, 'requisicoes'));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function obterRequisicao(id) {
  const docRef = doc(db, 'requisicoes', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: doc.id };
  } else {
    return null;
  }
}

export async function excluirRequisicao(id) {
  await deleteDoc(doc(db, 'requisicoes', id));
}

export async function atualizarRequisicao(id, requisicaoAtualizado) {
  const docRef = doc(db, 'requisicoes', id);
  await updateDoc(docRef, requisicaoAtualizado);
}
