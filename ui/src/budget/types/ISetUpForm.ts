import TypesBudgetTypeDeclaration from '../../utils/typesBudgetTypeDeclaration';

export default interface ISetUpForm {
  typesBudget: TypesBudgetTypeDeclaration | undefined;
  monthBudget: number;
}
