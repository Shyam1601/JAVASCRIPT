 // take bet
 // no.of lines user betting on
 // collect the bet
 // spin the slot machine
 // check if the user is won or lost
// if yes return the bet else you lost
// play again

const prompt=require("prompt-sync")();

const ROWS= 3;
const COLS= 3;

const SYM_Count ={
    "A":2,
    "B":4,
    "C":6,
    "D":8
};

const SYM_Val={
    "A":5,
    "B":4,
    "C":3,
    "D":2
};



const  deposite = ()  =>{
    while(true){
    const depositeAmount=prompt("Place the deposite Amount: ");
    const numDepositeAmount=parseFloat(depositeAmount);

    if(isNaN(numDepositeAmount) || numDepositeAmount<=0){
        console.log("Enter a valid amount  :-( ");
    }
    else {
        return numDepositeAmount;
    }
    }
};

const getNumberofLines = () =>{
    while(true){
        const numofLines=prompt("Number of lines to bet(1,3) : ");
        const NumofLines=parseFloat(numofLines);
    
        if(isNaN(NumofLines) || NumofLines<=0 || NumofLines >3){
            console.log("Enter a valid number  :-( ");
        }
        else {
            return NumofLines;
        }
        }
};

const getBet = (balance,FNumofLines) => {
    while(true){
        const bet=prompt("Enter the bet amount: ");
        const Bet=parseFloat(bet);
    
        if(isNaN(Bet) || Bet>=(balance/FNumofLines) || Bet < 0){
            console.log("Please place a valid bet :-) ");
        }
        else {
            return Bet;
        }
        }
};

const spin = () => {
    const sym=[];
    for(const [symbol,count] of Object.entries(SYM_Count)){
        for(let i=0;i<count;i++){
            sym.push(symbol);
        }
    }
    
    const reel=[];
    for (let i = 0; i < COLS; i++) {
        reel.push([]);
        const eSym=[...sym];
        for (let j = 0; j < ROWS ; j++) {
            const randomI=Math.floor(Math.random()*eSym.length);
            const selectedSym = eSym[randomI];
            reel[i].push(selectedSym);
            eSym.splice(randomI,1);
        }
    }
    return reel;
};

const transpose = (reel) =>{
    const row= [];
    for (let i = 0; i <ROWS; i++) {
        row.push([]);
        for (let j = 0; j < COLS; j++) {
            row[i].push(reel[j][i]);
        }
    }
    return row;
};

const print=(rows)=>{
    for (const a of rows) {
       let string= "";
       for(const [i,symbol] of a.entries()){
        string+=symbol
        if(i!=a.length-1){
            string+=" | "
        }
    }
    console.log(string);
    }
};

const getWin=(fop,bet,Lines) =>{
    let win=0;
    for (let i = 0; i < Lines; i++) {
        const sym=fop[i];
        let allSame=true;
        
        for(const symbol of sym){
            if(symbol !=symbol[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            win+=bet*SYM_Val[sym[0]]
        }
    }
    return win;
};

const game= () => {
    let balance=deposite();

    while(true){
    console.log("Your Balance is: $",+balance.toString());
    const FNumofLines= getNumberofLines();
    const Fbet=getBet(balance,FNumofLines);
    balance-=(Fbet*FNumofLines);
    const reels=spin();
    const fop=transpose(reels);
    print(fop);
    const winnings=getWin(fop,Fbet,FNumofLines);
    balance+=winnings;
    console.log("You've Won, $" + winnings.toString());

    if(balance<=0) {
        console.log("You ran out of money!");
        break;
    }else{
        console.log("After Winnings,Your Balance is: $",+balance.toString());
    }

    const PlayAgain =prompt("Do you want to play again (y/n) ?");

    if(PlayAgain!='y') {
        console.log("Thank you!..:-)");
        console.log("Please visit again...");
        console.log("You are going out with a total of $"+balance.toString());
        break;
    }
    }
};

game();