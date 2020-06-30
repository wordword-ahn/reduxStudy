const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const handleAdd = () => {
  console.log("더함");
}

const handleMinus = () => {
  console.log("빼기");
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);