import { CatalogStore } from "../domain/catalog.store";
import { Product } from "../domain/product";

export class InMemoryCatalogStore implements CatalogStore {
  private products = new Map<string, Product>();
  private updateListeners = new Array<() => void>();
  private productsLoading = false;

  selectProductById(productId: string): Product | undefined {
    return this.products.get(productId);
  }

  onUpdate(listener: () => void): void {
    this.updateListeners.push(listener);
  }

  addMany(products: Product[]): void {
    products.forEach((p) => this.products.set(p.id, p));
    this.notifyListeners();
  }

  setProductsLoading(loading: boolean): void {
    this.productsLoading = loading;
    this.notifyListeners();
  }

  selectProducts(): Product[] {
    return [...this.products.values()];
  }

  areProductsLoading(): boolean {
    return this.productsLoading;
  }

  private notifyListeners() {
    this.updateListeners.forEach((listener) => listener());
  }
}
