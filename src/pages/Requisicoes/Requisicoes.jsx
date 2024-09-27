import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../infra/firebase';

export async function inserirRequisicoes(novoRequisicoes) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado.');
  }
  const requisicaoComUid = { ...novoRequisicoes, userUid: user.uid };
  const docRef = await addDoc(collection(db, 'requisicoes'), requisicaoComUid);
  return { id: docRef.id, ...requisicaoComUid };
}

export async function listarRequisicoes(userUid = null) {
  let requisicoesRef = collection(db, 'requisicoes');

  if (userUid) {
    const requisicoesQuery = query(
      requisicoesRef,
      where('userUid', '==', userUid),
    );
    const querySnapshot = await getDocs(requisicoesQuery);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } else {
    const querySnapshot = await getDocs(requisicoesRef);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
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
