//get input name
function getName(){
    let flag=false;
    while (!flag){
        var name1 = prompt('Enter name');
        if (!isLetter(name1)){
        }else{
            flag=true;
        }
    }
    return name1;
}

//to check if name consists of only letters
function isLetter(user_name){
    
    if (!/[^a-zA-Z]/.test(user_name))
    {
        return true;
    }else{
        alert("Invalid name! Name can only contain Alphabets");
        return false;
    }
}

//if name is empty
function isEmpty(s_name){
    if (s_name.length>0){
        return false;
    }else {
        return true;
    }
}

function combineName(name_1, name_2){
    return name_1 + ' matches ' + name_2;
}

function toUpp(str){
    str= str.replaceAll(" ","");
    str=str.toUpperCase();
    return str;
}

//count number of times letter is repeated 
function checkCount(s){
    let count =1;
    for (let x=1; x<s.length; x++){
        if (s[0]==s[x]){
            count++;
        }
    }
    return count;

}

//converts name to number
function toNum(sname){
    let e = true;
    let scount ="";
    while (e){

        scount += checkCount(sname)+"";
        sname=sname.replaceAll(sname.charAt(0),"");
        if (isEmpty(sname)){
         e=false;
        }
    }
    return scount;
}

//calculate match
function calcMatch(num){

    let sum ="";
    let arr=[];
    
    while (num.length>0){
            let c = 0;
            let first_last = 0;
            first_last=parseInt(num[0])+parseInt(num[num.length-1]);
            arr[c]=first_last;
            sum+= first_last+"";
            num=num.replace( num.charAt(0),"" );
            num=num.slice(0,-1);
            //console.log(num.length);
            c++;
            if (num.length==1){
                break;
            }
    }
    sum+=num+'';
    if (sum.length>2){
        sum=calcMatch(sum);       
    }  
    return sum;
}

//remove duplicate elements in array
function removeDup(arrGender){
    for (let g = 0; g<arrGender.length; g++){
        for (let f=g+1; f<arrGender.length; f++){
            if (arrGender[g]==arrGender[f]){
                arrGender.splice(f,1);
            }
        }
    }
    return arrGender;

}

//sort array from highest to lowest
function sortArr(arrayScore){
    let newArray= [];
    let newIndex=0;
    while (arrayScore.length!=0){
        let max=arrayScore[0];
        let maxIndex=0;
        for (let j =1; j<arrayScore.length; j++){
            if (parseInt(arrScore[j].substring( arrScore[j].length-3 ,arrScore[j].length-1)) > parseInt(arrScore[maxIndex].substring( arrScore[maxIndex].length-3 ,arrScore[maxIndex].length-1))){
                max=arrayScore[j];
                maxIndex=j;
                
            }
        }
        if (parseInt(arrScore[maxIndex].substring( arrScore[maxIndex].length-3 ,arrScore[maxIndex].length-1))>79){
            newArray[newIndex]=max+', good match';

        }else{
            newArray[newIndex]=max;
        }
        
        newIndex++;
        arrayScore.splice(maxIndex,1);

    }
    return newArray;
}




/*let n1=getName();
let n2=getName();

//removes spaces and convert to uppercase
let name =combineName(n1, n2);
let s = toUpp(name);


//display match percentage
if (calcMatch(toNum(s))<80){
    console.log(name +" "+calcMatch(toNum(s))+"%");
}else{
    console.log(name +" "+calcMatch(toNum(s))+"%, good match");
}
*/

const csv = require('csv-parser');
const fs = require('fs');
const data=[];
let fmale = [];

fs.createReadStream('names.csv')
    .pipe(

        csv({
            delimiter: '\n'
            }
        )
    )
    .on('data', function (row)  {
       // console.log(row);
        data.push(row)
    })
    .on('end', function ()  {
        console.log(data);
        console.log('CSV file successfully processed');
    });

//console.log(data);

let gender = ["Kimberly,f","Jason,m","Billy,m","Trini,f","Tommy,m","Zack,m","billy,f","Jason,m", "Liam,m"];

//sort array into male and female
let female = [];
let f =0
for (let gf =0; gf<gender.length; gf++){
    if (gender[gf].charAt(gender[gf].length-1)=='f'){
        female[f]=gender[gf].substring(0, gender[gf].length-2);
        gender.splice(gf,1);
        f++;
    }
    gender[gf]=gender[gf].substring(0, gender[gf].length-2);
 }

female=removeDup(female);
gender=removeDup(gender);

let arrScore = [];
let score=0;

for (let c =0; c<gender.length; c++){
    for (let a=0; a<female.length; a++){
        let gname =combineName(gender[c], female[a]);
        let gs = toUpp(gname);

       /* //display match percentage
        if (calcMatch(toNum(gs))<80){
            console.log(gname +" "+calcMatch(toNum(gs))+"%");
        }else{
            console.log(gname +" "+calcMatch(toNum(gs))+"%, good match");
        }*/

        arrScore[score]=gname +" "+calcMatch(toNum(gs))+"%"
        score++;
    }
}
arrScore.sort();
arrScore=sortArr(arrScore);
for (let k = 0; k<arrScore.length; k++){
    console.log(arrScore[k]);

}

