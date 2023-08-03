const DATA_BASE_SIZE = 12;

class Client{
    firstName;
    lastName;
    clientID;
}

class Account{
    clientID;
    accountID;
    Owner;
    Balance;
    Transactions;
}

class Transaction{
    transactionID;
    FromID;
    FromName;
    ToID;
    ToName;
    Amount;
    Date;
    Type;
}

let Bank = {
    Clients: [],
    Accounts: [],
    Transactions: [],
    API: {
        GetClient: function(id){
            return Bank.Clients.find(client => client.clientID == id);
        },
    
        GetClientAccounts: function(id){
            return Bank.Accounts.find(account => account.clientID == id);
        },

        GetTransactionByAccount: function(id){
            const transactions = Bank.Transactions.filter(transaction => {
                transaction.FromName = Bank.API.GetClient(transaction.FromID).firstName;
                transaction.ToName = Bank.API.GetClient(transaction.ToID).firstName;
                
                if(transaction.FromID == id){
                    transaction.Type = "Withdraw";
                } else if(transaction.ToID == id){
                    transaction.Type = "Deposit";
                } else {
                    return false;
                }

                return transaction;
            });
            
            return transactions;
        },

        GetBalance: function(id){
            let transactions = Bank.GetTransactionByAccount(id);
            let balance = 0;
            for(let transaction of transactions){
                if(transaction.FromID == id){
                    balance -= transaction.Amount;
                }else{
                    balance += transaction.Amount;
                }
            }
            return balance;
        },

        GetAccountsWithUser: function(){
            let accounts = Bank.Accounts.map(account => {
                let client = Bank.API.GetClient(account.clientID);
                account.Owner = client;
                return account;
            }); 
            return accounts;
        }
    }
};

(function(){
    for(let i = 0; i < DATA_BASE_SIZE; i++){
        let client = new Client();
        client.firstName = `Client ${i}`;
        client.lastName = `Client ${i}`;
        client.clientID = i;
        Bank.Clients.push(client);
    }

    for(let i = 0; i < DATA_BASE_SIZE; i++){
        let account = new Account();
        account.accountID = i;
        account.clientID = Bank.Clients[i].clientID;
        account.Balance = Math.floor(Math.random() * 1000, 2);
        Bank.Accounts.push(account);
    }

    console.log(Bank.Accounts);

    for(let i = 0; i < DATA_BASE_SIZE; i++){
        let transaction = new Transaction();
        transaction.transactionID = i;
        transaction.FromID = i;
        transaction.ToID = Math.floor(Math.random() * Bank.Clients.length);
        transaction.Amount = Math.floor(Math.random() * 1000, 2);
        transaction.Date = new Date().toISOString().slice(0, 10);
        if(transaction.Type == "Withdraw") transaction.Amount *= -1;
        Bank.Transactions.push(transaction);
    }
})();