import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public afStore: AngularFirestore) {}

  setJobData(jobId, data) {
    const ref: AngularFirestoreDocument<any> = this.afStore.doc(
      `jobs/${jobId}`
    );
    console.log('job data', data);
    return ref.set(data, {
      merge: true,
    });
  }

  getJobData(jobId: any) {
    const ref: AngularFirestoreDocument<any> = this.afStore.doc(
      `jobs/${jobId}`
    );
    return ref.snapshotChanges();
    // .subscribe((data) => {
    //   console.log(data.type);
    //   if (data.type == 'modified') console.log(data.payload.data());
    // });
  }
}
