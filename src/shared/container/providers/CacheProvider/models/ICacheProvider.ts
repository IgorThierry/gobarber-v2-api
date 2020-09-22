export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
}
