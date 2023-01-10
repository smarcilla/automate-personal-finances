import { Concept } from '../business/Concept';
import { Report } from '../business/Report';
import { Transaction } from '../business/Transaction';

export class ReportHelper {
  constructor(public report: Report) {}

  groupConcepts(): Concept[] {
    return this.report.transactions.reduce(
      (currentConcepts: Concept[], currentTransaction: Transaction) => {
        const existingConcept = currentConcepts.find(concept =>
          concept.isEqual(currentTransaction.concept)
        );

        if (!existingConcept) {
          return [...currentConcepts, currentTransaction.concept];
        }

        return currentConcepts;
      },
      [] as Concept[]
    );
  }
}
