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
  return docRef.id;
}

export async function listarRequisicoes() {
  let retorno;
  await getDocs(collection(db, 'requisicoes')).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterRequisicao(id) {
  const docRef = doc(db, 'requisicoes', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function excluirRequisicao(id) {
  await deleteDoc(doc(db, 'requisicoes', id));
}

export async function atualizarRequisicao(id, requisicaoAtualizado) {
  const docRef = doc(db, 'requisicoes', id);
  await updateDoc(docRef, requisicaoAtualizado);
}
