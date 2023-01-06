export interface ImporterStrategy<T> {
  importData(): T[];
}
