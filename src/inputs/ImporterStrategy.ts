export interface ImporterStrategy<T> {
  importData(file: string): T[];
}
