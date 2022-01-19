class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  static new(props: { name: string }) {
    return new this(props.name);
  }
  greet() {
    return `Hello, I'm ${this.name}!`;
  }
}

export default User;
