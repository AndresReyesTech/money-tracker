import { observable } from 'mobx';
import { StorageCredentials } from 'features/storage';

export enum SessionMode {
  Guest,
  Demo,
  Live
}

interface SessionT {
  mode: SessionMode;
  authToken?: string;
  credentials?: StorageCredentials;
}

export class SessionStore {
  @observable mode: SessionMode;
  @observable authToken?: string;
  @observable credentials?: StorageCredentials;

  constructor({ mode, authToken, credentials }: SessionT) {
    this.mode = mode;
    this.authToken = authToken;
    this.credentials = credentials;
  }

  static init(): SessionStore | undefined {
    const data = localStorage.getItem('userInfo');
    if (data) {
      const session: SessionT = JSON.parse(data);

      return new SessionStore(session);
    }

    return;
  }

  static initGuest(): SessionStore {
    return new SessionStore({ mode: SessionMode.Guest });
  }
}
