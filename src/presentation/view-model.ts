import { Store } from "../shared/store";

export abstract class ViewModel<Data> {
  private onDataUpdated: ((data: Data | undefined) => void) | undefined;
  private data: Data | undefined;
  private initialized = false;

  constructor(private readonly stores: Store[]) {}

  protected abstract selector(): Data;

  subscribe(onDataUpdated: (data: Data | undefined) => void) {
    if (!this.initialized) {
      this.init();
    }
    this.onDataUpdated = onDataUpdated;
    onDataUpdated(this.data);

    return () => {
      this.onDataUpdated = undefined;
    };
  }

  private bindStoreUpdate(store: Store) {
    store.onUpdate(this.computeData.bind(this));
  }

  private init() {
    this.stores.forEach((store) => this.bindStoreUpdate(store));
    this.computeData();
    this.initialized = true;
  }

  private computeData() {
    this.data = this.selector();
    this.onDataUpdated?.(this.data);
  }
}
