export interface Expense {
    id: string;
    title: string;
    amount: number;
    members: ExpenseGroupMember[];
    type: string;
    date: string;
    paid_by: ExpenseGroupMember;
  }
  
  //This type will be removed after merge with another feature
  export interface ExpenseGroupMember {
    id: string;
    name: string;
    isChecked: boolean;
  }
  