import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

// https://medium.com/wizpanda/dealing-with-breaking-change-in-ionic-5-db3ba711dfcd

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private channels: { [key: string]: Subject<any> } = {};

  constructor() {}

  publish(key: string, data = {}) {
    const subject = this.channels[key];
    if (!subject) {
      // Or you can create a new subject for future subscribers
      return;
    }

    subject.next(data);
  }

  subscribe(key, observer: (_: any) => void): Subscription {
    if (!this.channels[key]) {
      // You can also use ReplaySubject with one concequence
      this.channels[key] = new Subject<any>();
    }

    return this.channels[key].subscribe(observer);
  }

  unsubscribe(key) {
    const subject = this.channels[key];
    if (!subject) {
      return;
    }

    subject.complete();
    delete this.channels[key];
  }
}
