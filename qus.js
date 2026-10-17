
let str = "mmaamm";

let front = "";

for (let i = 0; i < str.length; i++) {
    front = front + str[i];
}

let back = "";

for (let j = str.length - 1; j >= 0; j--) {
    back = back + str[j];
}

if (front === back) {
    console.log("It's a palindrome");
} else {
    console.log("It's not a palindrome");
}
