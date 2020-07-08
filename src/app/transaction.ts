export class Transaction {

    private amount:number;
    private name: string;
    private date: string;
    private type: TransactionType;


    constructor(a:number, n:string,tType:TransactionType, date:string){
        this.amount = parseFloat(a.toFixed(2));
        this.name = n;
        this.type = tType;
        this.date = date;
    }


    //used to generate a transaction object from json data
    static generateTransactionFromData(data:Transaction):Transaction{
        return new this(data.amount,data.name,data.type,data.date);
    }

    /*
    *
    * This function compares two transaction. Transaction are equal if all fields are equal
    *
    */
    public equals(tran : Transaction ):boolean{
        return this.amount === tran.amount && this.name === tran.name && this.date === tran.date && this.type === tran.type;
    }

    public getAmount() : number{
        return this.amount;
    }

    public getName() : string{
        return this.name;
    }

    public getType() : TransactionType{
        return this.type;
    }

    public getDate() : string{
        return this.date;
    }
}


export enum TransactionType {
    Expenses,Income
}
