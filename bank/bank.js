document.addEventListener('DOMContentLoaded', function(){
    bank();
    clickEvents();
});

function bank() {
    let accountSection = document.querySelector('#accounts');
    render(templates.account, Bank.API.GetAccountsWithUser());
    const accounts = Bank.API.GetAccountsWithUser()
    console.log(accounts);
    accountSection.innerHTML = render(templates.account, accounts);
}

let templates = {
    client: `<div class="client">
        <div class="client-name">[firstName] [lastName]</div>
        <div class="client-id">[clientID]</div>
    </div>`,
    account: `<div class="account [clientID]">
    <div class="account-balance">[Balance] &#8362</div>
    <div class="account-owner">[Owner.firstName] [Owner.lastName]</div>
    </div>`, 
    transaction: `<div class="transaction [Type]Card">
        <div class="transaction-amount">[Amount] &#8362</div>
        <span class="transaction-from">[FromName]</span> &#8594 
        <span class="transaction-to">[ToName]</span><br>
        <div class="transaction-date">[Date]</div>
    </div>`
}

function clickEvents(){
    const accounts = document.querySelectorAll('.account');

    accounts.forEach(account => {
        account.addEventListener('click', function(ev){
            let accountDiv = ev.target.closest('.account');
            document.querySelector('.account.active')?.classList?.remove('active');
            accountDiv.classList.add('active');

            let accountID = accountDiv.classList[1];
            let transactions = Bank.API.GetTransactionByAccount(accountID);
            console.log(transactions);
            const transactionSection = document.querySelector('#accountTransactions');
            transactionSection.innerHTML = render(templates.transaction, transactions);
        })

    })
}