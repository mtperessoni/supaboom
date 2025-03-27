export class User {
  constructor(
    public email: string,
    public name: string,
    public codename?: string,
    public provider?: string,
  ) {}
}
