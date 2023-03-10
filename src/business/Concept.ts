export class Concept {
  static build(conceptDraft: string): Concept {
    return new Concept(conceptDraft);
  }

  private concept: string;

  constructor(conceptDraft: string) {
    this.concept = conceptDraft;
  }
}
