export interface Store {
  onUpdate(listener: () => void): void;
}
