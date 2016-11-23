$(document).ready(function() {
  var current = '';   //each button press
  var entry = '';     //display value on upper row
  var result = '';    //calculated result
  var history = '';   //display value on lower row
  var isDecimal = false;    //entry is decimal
  var afterResult = false;  //button press right after '='
  var operators = ['+', '-', '*', '/', 'x'];
  
  $('button').click(function() {
    current = $(this).attr("value");
    console.log('current: ' + current);
    
    // If right after '=' and get a result
    if (afterResult) {
      if (operators.indexOf(current) >= 0) {
        history = result;
      } else {
        result = '';
      }
    }
    afterResult = false;
    
    // Prevent multiple decimal points
    if (isDecimal && current === '.'){
      current = '';
    }

    var getLastVal = function(inputVal) {
      return inputVal[inputVal.length-1];
    };
    
    var removeLast = function(inputVal) {
      return inputVal.toString().slice(0, inputVal.length-1);
    };
    
    // If end with an operator and enter another operator, change the last operator
    if (operators.indexOf(current) >= 0 && operators.indexOf(getLastVal(entry)) >= 0) {
      entry = removeLast(entry);
    }
    
    var operatorUpdate = function(input, htmlText) {
      entry = input;
      result += entry;
      if (operators.indexOf(getLastVal(history)) >= 0) {
        history = removeLast(history);
      }
      history += htmlText;
      $('#display').html(htmlText);
      $('#history').html(history);
      current = '';
      isDecimal = false;
    };
    
    if (current === 'ac') {
      console.log('in ac');
      result = '';
      entry = '';
      current = '';
      history = '';
      $('#display').html('0');
      $('#history').html('0');
      isDecimal = false;
    } else if (current === 'ce') {
      console.log('in ce');
      console.log('before: ' + history);
      history = history.toString().slice(0, -entry.length);
      result = result.toString().slice(0, -entry.length);
      entry = result;
      console.log('after: ' + history);
      $('#display').html('0');
      $('#history').html(history || '0');
      current = '';
      isDecimal = false;
    } else if (current === '+') {
      operatorUpdate('+', '+');
    } else if (current === '-') {
      operatorUpdate('-', '-');
    } else if (current === '*') {
      operatorUpdate('*', 'x');
    } else if (current === '/') {
      operatorUpdate('/', '/')
    } else if (current === '.') {
      if (entry === '' || isNaN(entry[entry.length-1])) {
        entry = '0.';
        result += current;
        history += current;
      } else {
        entry += '.';
        result += '.';
        history = result;
      }
      $('#display').html(entry);
      $('#history').html(history);
      current = '';
      isDecimal = true;
    } else if (current === '=') {
      if (entry[entry.length-1] === '.') {
        entry = entry.slice(0, entry.length-1);
        result = result.slice(0, result.length-1);
      }
      entry = eval(result).toString();
      $('#display').html(entry);
      result = eval(result);
      history = result;
      $('#history').html(history);
      history = result;
      current = '';
      afterResult = true;
      isDecimal = false;
    } else if (Number(current)) {
      if (operators.indexOf(getLastVal(history)) >= 0) {
        entry = '';
      }
      console.log('in other');
      entry += current;
      result += current;
      history += current;
      $('#display').html(entry);
      $('#history').html(history);
      current = '';
      
    }
    
  });
  // end of button click
  
});


