import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {}

  //SETANDO A REFERÊNCIA PARA UMA COLLECTION DENTRO DO FIRESTORE
  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  private setItem(item: T, operation: string): Promise<T> {
    return this.collection
      .doc<T>(item.id)
      [operation](item)
      .then(() => item);
  }

  //LISTANDO TODOS OS REGISTROS
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  //BUSCANDO REGISTROS POR ID
  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
    // toda vez que tiver um Observable temos que usar o método valueChanges()
    // pois ele retorna um Observable<T>
  }

  //CRIANDO NOVOS REGISTROS
  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  //ATUALIZANDO REGISTROS EXISTENTES
  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  //DELETANDO REGISTROS EXISTENTES
  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }
}
