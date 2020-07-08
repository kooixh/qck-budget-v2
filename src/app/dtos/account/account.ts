import { Transaction, TransactionType } from '../transaction/transaction';

export class Account {
    private name: string;
    private budget: number;
    private balance: number;
    private status: AccountStatus;
    private transactions: Transaction[];
    transactionMap: { [date: string]: number };

    constructor(name: string, iB: number) {
        this.name = name;
        this.transactions = new Array();
        this.budget = parseFloat(iB.toFixed(2));
        this.balance = this.budget;
        this.status = this.budget > 0 ? AccountStatus.Surplus : AccountStatus.Deficit;
        this.transactionMap = {};
    }

    // generate an account object from json data, used for internal storage
    public static generateAccountFromData(data: Account): Account {
        const acc = new this(data.name, data.budget);
        acc.transactions = [];
        for (let i = 0; i < data.transactions.length; i++) {
            acc.transactions.push(Transaction.generateTransactionFromData(data.transactions[i]));
        }
        acc.balance = data.balance;
        acc.status = data.status;
        acc.transactionMap = data.transactionMap;

        return acc;
    }

    // add and remove transaction
    public addTransaction(t: Transaction) {
        this.transactions.push(t);

        const dateString = t.getDate();

        // add to the mapping
        if (dateString in this.transactionMap) {
            this.transactionMap[dateString] += 1;
        } else {
            this.transactionMap[dateString] = 1;
        }

        if (t.getType() === TransactionType.Expenses) {
            this.balance -= t.getAmount();
        } else {
            this.balance += t.getAmount();
        }

        this.balance = parseFloat(this.balance.toFixed(2));
    }

    public removeTransaction(index: number) {
        if (index < 0 || index >= this.transactions.length) {
            throw new Error('index out of range');
        }

        const tDate = this.transactions[index].getDate();
        const t = this.transactions[index];

        if (t.getType() === TransactionType.Expenses) {
            this.balance += t.getAmount();
        } else {
            this.balance -= t.getAmount();
        }
        this.transactionMap[tDate]--;
        this.transactions.splice(index, 1);
    }

    // get the number of transaction for a Date
    public getTransactionsByDate(dateString: string): number {
        if (dateString in this.transactionMap) {
            return this.transactionMap[dateString];
        }

        return 0;
    }

    public getTransactions(): Transaction[] {
        return this.transactions;
    }

    public getName(): string {
        return this.name;
    }

    public getBalance(): number {
        return this.balance;
    }
}

enum AccountStatus {
    Surplus,
    Deficit
}
