
export type IAmount = {
    label: number;
    icon: JSX.Element;
};

export type LastUpdatedCell = {
    label: string;
    timestamp: number;
};

export type ITypeCell = {
    label: string;
    icon: JSX.Element;
};

export type IDateCell = {
    label: string;
    icon: JSX.Element;
};

export type INotesCell = {
    label: string;
    icon: JSX.Element;
};


export type IExpenseItem = {
    id: string
    amount: IAmount;
    type: ITypeCell;
    date: IDateCell;
    notes: INotesCell;
    lastUpdated: LastUpdatedCell;
};
