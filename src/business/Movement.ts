export class Movement {
  static build(movementDraft: string): Movement {
    return new Movement(movementDraft);
  }

  private movement: string;

  constructor(movementDraft: string) {
    this.movement = movementDraft;
  }
}
