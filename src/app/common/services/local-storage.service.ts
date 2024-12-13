import { Injectable } from "@angular/core";
import { AppStorageKey } from "../models/enums/app-constant";
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private storage: Storage) {  this.init();}

    async set(key: AppStorageKey, value: any) {
        await this.storage.set(key, value);
    }

    get(key: AppStorageKey) {
        return this.storage.get(key);
    }


  private async init() {
    await this.storage.create(); // Inicializa la base de datos de almacenamiento
  }

    async clear(keys: Array<string>) {
        if (!keys) { return; }
        if (keys.length === 1 && keys[0] === '*') { keys = Object.values(AppStorageKey); }
        keys = keys.filter(x => x != AppStorageKey.CurrentUser);
        keys.forEach(async key => {
            await this.storage.remove(key);
        });
    }
}
