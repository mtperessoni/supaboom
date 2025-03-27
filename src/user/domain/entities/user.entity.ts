export class User {
  constructor(
    public email: string,
    public password?: string,
    public provider?: string,
    public codename?: string,
    public birthday?: Date,
  ) {}
}
