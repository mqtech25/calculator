var operand = document.querySelectorAll(".operand");
var operator = document.querySelectorAll(".operator");
var result = document.querySelector(".result");
var x = [];
var copyX;

document
  .getElementsByTagName("body")[0]
  .addEventListener("keyup", function (e) {
    console.log(e.key);
    if (e.keyCode >= 96 && e.keyCode <= 105) {
      result.value += e.key;
    } else if (e.keyCode == 191 || e.key == "/") {
      result.value += "÷";
    } else if (e.key == "+" || e.key == "-") {
      result.value += e.key;
    } else if (e.key == "%") {
      result.value += e.key;
    } else if (e.key == "*") {
      result.value += "×";
    } else if (e.key == ".") {
      result.value += ".";
    } else if (e.key == "Enter") {
      equal();
    } else if (e.key == "Backspace") {
      removeDataByOne();
    }
  });

operand.forEach((element) => {
  element.addEventListener("click", function () {
    result.value += element.outerText;
  });
});
operator.forEach((element) => {
  element.addEventListener("click", function (e) {
    result.value += element.outerText;
  });
});
function equal() {
  result.value += "=";
  var str = result.value;
  console.log(str);
  var temp = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == "+") {
      x.push(temp);
      x.push(str.charAt(i));
      temp = "";
    } else if (str.charAt(i) == "-") {
      x.push(temp);
      x.push(str.charAt(i));
      temp = "";
    } else if (str.charAt(i) == "×") {
      x.push(temp);
      x.push(str.charAt(i));
      temp = "";
    } else if (str.charAt(i) == "÷") {
      x.push(temp);
      x.push(str.charAt(i));
      temp = "";
    } else if (str.charAt(i) == "=") {
      x.push(temp);
      temp = "";
    } else if (str.charAt(i) == "%") {
      x.push(temp);
      x.push(str.charAt(i));
      temp = "";
    } else {
      if (str.charAt(i) == ".") {
        temp = temp + ".";
      } else {
        temp = temp + str.charAt(i) + "";
      }
    }
  }
  calculation();
  console.log(x);
}
function calculation() {
  copyX = x;

  while (copyX.length > 1) {
    var tempResult = "";
    if (copyX.includes("÷")) {
      var index = copyX.lastIndexOf("÷");
      var tempResult = copyX[index - 1] / copyX[index + 1];
      copyX[index - 1] = tempResult;
      copyX.splice(index, 2);
      console.log(copyX);
      continue;
    }
    if (copyX.includes("×")) {
      var index = copyX.lastIndexOf("×");
      var tempResult = copyX[index - 1] * copyX[index + 1];
      copyX[index - 1] = tempResult;
      copyX.splice(index, 2);
      console.log(copyX);
      continue;
    }
    if (copyX.includes("%")) {
      var index = copyX.lastIndexOf("%");
      var tempResult = parseInt(copyX[index - 1]) % parseInt(copyX[index + 1]);
      copyX[index - 1] = tempResult;
      copyX.splice(index, 2);
      console.log(copyX);
      continue;
    }
    if (copyX.includes("+")) {
      var index = copyX.lastIndexOf("+");
      if (copyX[index - 2] == "-" && copyX[index - 1] > copyX[index + 1]) {
        copyX[index - 2] = "-";
        tempResult =
          parseFloat(-copyX[index - 1]) + parseFloat(copyX[index + 1]);
      } else if (
        copyX[index - 2] == "-" &&
        copyX[index - 1] < copyX[index + 1]
      ) {
        copyX[index - 2] = "+";
        tempResult =
          parseFloat(-copyX[index - 1]) + parseFloat(copyX[index + 1]);
      } else {
        tempResult =
          parseFloat(copyX[index - 1]) + parseFloat(copyX[index + 1]);
        console.log(tempResult);
      }
      copyX[index - 1] = Math.abs(tempResult);
      copyX.splice(index, 2);
      console.log(copyX);
      continue;
    }
    if (copyX.includes("-")) {
      var index = copyX.lastIndexOf("-");

      if (copyX[index - 2] == "-" && copyX[index - 1] > copyX[index + 1]) {
        copyX[index - 2] = "-";
        tempResult = -copyX[index - 1] - copyX[index + 1];
      } else if (
        copyX[index - 2] == "-" &&
        copyX[index - 1] < copyX[index + 1]
      ) {
        copyX[index - 2] = "-";
        tempResult = -copyX[index - 1] - copyX[index + 1];
      } else if (
        copyX[index - 2] == "-" &&
        copyX[index - 1] < copyX[index + 1]
      ) {
        copyX[index - 2] = "-";
        tempResult = -copyX[index - 1] - copyX[index + 1];
      } else if (
        copyX[index - 2] == "+" &&
        copyX[index - 1] < copyX[index + 1]
      ) {
        copyX[index - 2] = "-";
        tempResult = copyX[index - 1] - copyX[index + 1];
      } else {
        tempResult = copyX[index - 1] - copyX[index + 1];
      }

      copyX[index - 1] = Math.abs(tempResult);
      copyX.splice(index, 2);
      console.log(copyX);
      continue;
    }
    break;
  }
  result.value = null;
  result.value = copyX[copyX.length - 1];
  copyX.splice(0, copyX.length - 1);
}
function removeData() {
  x = [];
  result.value = null;
}
function removeDataByOne() {
  result.value = result.value.substring(0, result.value.length - 1);
}
