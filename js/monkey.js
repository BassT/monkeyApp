/*  ===========================================================
    ===========================================================
                      general stuff for monkeys
    ===========================================================
    =========================================================== */

$chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',"'",' ',',','.',';',':','?','!','(',')','-',"@",'"','#'];

// holds all second-order "chars"
$charsChars = new Array($chars.length * $chars.length);
for (var i = $chars.length - 1; i >= 0; i--) {
  for (var j = $chars.length - 1; j >= 0; j--) {
    $charsChars[(i)*40 + j] = $chars[i] + $chars[j];
  };
};

// highcharts data update function
function updateSeries(data, totalChars){
  var result = new Array(data.length);
  for (var i = data.length - 1; i >= 0; i--) {
    result[i] = data[i] / totalChars;
  };
  return result;
}

/*  ===========================================================
    ===========================================================
                      straightforward monkey
    ===========================================================
    =========================================================== */


$sfTotalChars = 0;

// holds the relative probability of the chars the straight-forward monkey typed
$sfMonkeySeries = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $sfMonkeySeries[i] = 0;
}

// holds the absolute count of each char the straight-forward monkey typed
$sfMonkeyChars = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $sfMonkeyChars[i] = 0;
}

// interaction and monkey functions
$(document).ready(function(){
  // sf start button
  $("#sf-start-button").click(function() {
    $monkeytimer = window.setInterval(function() {
      $i = Math.floor(Math.random()*40);
      $("#sf-monkey-text").text($("#sf-monkey-text").text() + $chars[$i]);
      $sfTotalChars++;
      $sfMonkeyChars[$i]++;
      $sfMonkeySeries = updateSeries($sfMonkeyChars, $sfTotalChars);
      $("#sf-chart").highcharts().series[1].setData($sfMonkeySeries);
    }, 50);
  });

  // sf stop button
  $("#sf-stop-button").click(function() {
    clearInterval($monkeytimer);
  });
});

// highcharts function
$(function(){
  $("#sf-chart").highcharts({
    chart:{
      type: "area"
    },
    title: {
      text: 'Comparison'
    },
    xAxis: {
      categories: $chars
    },
    yAxis: {
      title: {
        text: 'Relative probability'
      }
    },
    series: [{
      name: 'Act III of Hamlet',
      data: [0.058000227, 0.011639791, 0.016579605, 0.031200318, 0.093033159, 0.017857143, 0.013570293, 0.050334999, 0.049284579, 0.000965251, 0.007239382, 0.035146491, 0.025238474, 0.049426527, 0.073188735, 0.012292755, 0.000766523, 0.045224847, 0.052691347, 0.072592551, 0.028787191, 0.008772428, 0.02032705, 0.000596184, 0.022229162, 0.000397456, 0.005763116, 0.196854417, 0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: 'Monkey'
    }]
  });
});

/*  ===========================================================
    ===========================================================
                      first-order monkey
    ===========================================================
    =========================================================== */

$foTotalChars = 0;
$foFirstProbSum = 0;
$textFlag = false;

// holds the absolute count of each char the straight-forward monkey typed
$foMonkeyChars = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $foMonkeyChars[i] = 0;
}

// holds the absolute of each char in the input text for the first-order monkey
$foSingleChars = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $foSingleChars[i] = 0;
}

// holds the relative probability of the chars the first-order monkey typed
$foMonkeySeries = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $foMonkeySeries[i] = 0;
}

// holds the relative probability of each char in the input text for the first-order monkey - equivalent to first-order proability
$foFirstProb = new Array($chars.length);
for(var i = 0; i < $chars.length; i++){
  $foFirstProb[i] = 0;
}

$(document).ready(function() {
  // fo start button
  $("#fo-start-button").click(function() {
    $foMonkeyTimer = window.setInterval(function() {
      $nextChar = $chars[getCharFirstOrder($textFlag)];
      $("#fo-monkey-text").text($("#fo-monkey-text").text() + $nextChar);
      $foTotalChars++;
      $foMonkeyChars[$chars.indexOf($nextChar)]++;
      $foMonkeySeries = updateSeries($foMonkeyChars, $foTotalChars);
      $("#fo-chart").highcharts().series[1].setData($foMonkeySeries);
    }, 50);
  });

  // fo stop button
  $("#fo-stop-button").click(function() {
    clearInterval($foMonkeyTimer);
  });

  // save-text button
  $('#fo-save-text-input').click(function() {
    $text = $('#fo-text-input-text').val();
    computeProbability($text, true, true);
    // show progress in progress bar
    $("#fo-chart").highcharts().series[0].update({name:$("#fo-text-title").val()}, false);
    $("#fo-chart").highcharts().series[0].setData($foFirstProb);
  });
});

// highcharts function
$(function() {
  $("#fo-chart").highcharts({
    chart:{
      type: "area"
    },
    title: {
      text: 'Comparison'
    },
    xAxis: {
      categories: $chars
    },
    yAxis: {
      title: {
        text: 'Relative probability'
      }
    },
    series: [{
      name: 'Act III of Hamlet',
      data: [0.058000227, 0.011639791, 0.016579605, 0.031200318, 0.093033159, 0.017857143, 0.013570293, 0.050334999, 0.049284579, 0.000965251, 0.007239382, 0.035146491, 0.025238474, 0.049426527, 0.073188735, 0.012292755, 0.000766523, 0.045224847, 0.052691347, 0.072592551, 0.028787191, 0.008772428, 0.02032705, 0.000596184, 0.022229162, 0.000397456, 0.005763116, 0.196854417, 0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: 'Monkey'
    }]
  });
});

// first-order monkey act III of hamlet
function getCharFirstOrderFromHamlet() {
  $c = Math.floor(Math.random()*35224);
  if ($c < 6934) {
    $c = $chars.indexOf(" ");
  } else if ($c < 10211) {
    $c = $chars.indexOf("e");
  } else if ($c < 12789) {
    $c = $chars.indexOf("o");
  } else if ($c < 15346) {
    $c = $chars.indexOf("t");
  } else if ($c < 17389) {
    $c = $chars.indexOf("a");
  } else if ($c < 19245) {
    $c = $chars.indexOf("s");
  } else if ($c < 21018) {
    $c = $chars.indexOf("h");
  } else if ($c < 22765) {
    $c = $chars.indexOf("n");
  } else if ($c < 24501) {
    $c = $chars.indexOf("i");
  } else if ($c < 26094) {
    $c = $chars.indexOf("r");
  } else if ($c < 27332) {
    $c = $chars.indexOf("l");
  } else if ($c < 28431) {
    $c = $chars.indexOf("d");
  } else if ($c < 29445) {
    $c = $chars.indexOf("u");
  } else if ($c < 30334) {
    $c = $chars.indexOf("m");
  } else if ($c < 31117) {
    $c = $chars.indexOf("y");
  } else if ($c < 31833) {
    $c = $chars.indexOf("w");
  } else if ($c < 32462) {
    $c = $chars.indexOf("f");
  } else if ($c < 33046) {
    $c = $chars.indexOf("c");
  } else if ($c < 33524) {
    $c = $chars.indexOf("g");
  } else if ($c < 33957) {
    $c = $chars.indexOf("p");
  } else if ($c < 34367) {
    $c = $chars.indexOf("b");
  } else if ($c < 34676) {
    $c = $chars.indexOf("v");
  } else if ($c < 34931) {
    $c = $chars.indexOf("k");
  } else if ($c < 35134) {
    $c = $chars.indexOf("'");
  } else if ($c < 35168) {
    $c = $chars.indexOf("j");
  } else if ($c < 35195) {
    $c = $chars.indexOf("q");
  } else if ($c < 35195) {
    $c = $chars.indexOf("x");
  } else if ($c < 35224) {
    $c = $chars.indexOf("z");
  }
  return $c;
}

// first-order monkey generic
function getCharFirstOrder(textFlag) {
  if(textFlag === false){ // assume act III of hamlet
    return getCharFirstOrderFromHamlet();
  } else {
    var rand = Math.random()*$foFirstProbSum;
    var i = 0;
    var probSum = $foFirstProb[0];
    for(i = 0; i < $chars.length - 1 && probSum < rand; i++){
      probSum+= $foFirstProb[i + 1];
    }
    return i;
  }
}

// compute char probability
function computeProbability(text, firstOrder, secondOrder){
  if(firstOrder){
    computeFirstOrderProbability(text);
    // if (second-order) {
    //   computeSecondOrderPorbability(text);
    // }
  }
}

// compute first order char probability
function computeFirstOrderProbability(text){
  var c = "";
  var index = 0;
  for (var i = text.length - 1; i >= 0; i--) {
    c = text.charAt(i);
    index = $chars.indexOf(c);
    $foSingleChars[index]++;
  };
  var l = text.length;
  for (var i = $foSingleChars.length - 1; i >= 0; i--) {
    $foFirstProb[i] = 0.0 + $foSingleChars[i] / l;
  }
  $textFlag = true;
  for(var k = 0; k < $foFirstProb.length; k++) { 
    $foFirstProbSum += $foFirstProb[k];
  }
}



/*  ===========================================================
    ===========================================================
                      second-order monkey
    ===========================================================
    =========================================================== */

var soTotalChars = new Array($chars.length);
for (var i = soTotalChars.length - 1; i >= 0; i--) {
  soTotalChars[i] = 0;
};

var soMonkeyChars = new Array($charsChars.length);
for (var i = soMonkeyChars.length - 1; i >= 0; i--) {
  soMonkeyChars[i] = 0;
};

var soMonkeyProbs = new Array($charsChars.length);
for (var i = soMonkeyProbs.length - 1; i >= 0; i--) {
  soMonkeyProbs[i] = 0;
};

var soTextChars = new Array($charsChars.length);
for (var i = soTextChars.length - 1; i >= 0; i--) {
  soTextChars[i] = 0;
};

var soCharsProb = new Array($charsChars.length);
for (var i = soCharsProb.length - 1; i >= 0; i--) {
  soCharsProb[i] = 0;
};

$(document).ready(function(){
  // populate previous character dropdown menu
  for (var i = 0; i < $chars.length; i++) {
      $("#prev-char-dropdown").append("<li><a href='#so-results'>" + $chars[i] + "</a></li>")
  }
  
  // change character on click in dropdown menu
  $("#prev-char-dropdown li").click(function() {
    $("#selected-char").text($(this).text());
    var start = $chars.indexOf($("#selected-char").text()); 
    //selct range where selected char is leading
    $("#so-chart").highcharts().series[0].setData($(soCharsProb).slice(start * 40, start * 40 + 39));
  });

  // analyze input text on click on save button
  $("#so-save-text-input").click(function(){
    $('body').css('cursor', 'progress');
    setTimeout(function(){
      var text = $("#so-text-input-text").val().toLowerCase();
      var currentCC = undefined;
      var index = 0;

      // count second-order occurences
      for (var i = text.length - 1; i > 0; i--) {
        currentCC = text.charAt(i-1) + text.charAt(i);
        index = $charsChars.indexOf(currentCC);
        soTextChars[index]++;
      };
      
      // compute relative occurence of each character pair given the first character
      for (var i = soTextChars.length - 1; i >= 0; i = i - 40) {
        var sum = 0;
        // compute total occurence of each character as first character
        for(var j = i - 39; j <= i; j++ ){
          sum += soTextChars[j];
        }
        // compute relative occurence of the current first character
        for(var j = i - 39; j <= i; j++ ){
          soCharsProb[j] = 0.0 + soTextChars[j] / sum;
        }
      };

      // update highchars series
      $("#so-chart").highcharts().series[0].update({name:$("#so-text-title").val()}, false);
      
      // get index of selected char
      var start = $chars.indexOf($("#selected-char").text()); 
      //selct range where selected char is leading
      $("#so-chart").highcharts().series[0].setData($(soCharsProb).slice(start * 40, start * 40 + 39));
      $('body').css('cursor', 'default');
    }, 500);    
  });

  // start button
  $("#so-start-button").click(function() {
    $soMonkeyTimer = window.setInterval(function() {
      if($("#so-monkey-text").text() === ""){
        $rand = Math.floor(Math.random()*40);
        $("#so-monkey-text").text($chars[$rand]);
      } else {
        $lastChar = $("#so-monkey-text").text().charAt($("#so-monkey-text").text().length - 1);
        $indexLastChar = $chars.indexOf($lastChar);
        // compute total probability of second order letters that start with previous char
        $lastCharTotalProb = 0;
        for (var i = $chars.length - 1; i >= 0; i--) {
          $lastCharTotalProb += soCharsProb[$indexLastChar * 40 + i];
        };
        $randProb = Math.random() * $lastCharTotalProb; // adjust for weird probability sum
        $probSum = soCharsProb[$indexLastChar*40];
        var index = 0;
        // sum probabilites of relevant second order letters until higher than $randProb
        for (; index < $chars.length - 1 && $probSum < $randProb; index++) {
          $probSum += soCharsProb[$indexLastChar*40 + index + 1];
        };
        // increase total chars for second order letters that start with previous char
        soTotalChars[index]++;
        // increase total count for the second order letter we currently have
        soMonkeyChars[$indexLastChar*40 + index]++;
        $("#so-monkey-text").text($("#so-monkey-text").text() + $chars[index]);
        // update probabilities within relevant part of soMonkeyProb
        $soMonkeyProbSlice = updateSeries(soMonkeyChars.slice($indexLastChar*40, $indexLastChar*40 + 39), soTotalChars[$indexLastChar]);
        // copy to original monkey prob array
        for (var i = $soMonkeyProbSlice.length - 1; i >= 0; i--) {
          soMonkeyProbs[$indexLastChar*40 + i] = $soMonkeyProbSlice[i];
        };
        // feed relevant part of soMonkeyProb to chart based on selected char
        if($chars[$indexLastChar] === $("#selected-char").text()){
          $("#so-chart").highcharts().series[1].setData(soMonkeyProbs.slice($indexLastChar * 40, $indexLastChar * 40 + 39));
        }
      }
    }, 50);
  });

  // stop button
  $("#so-stop-button").click(function() {
    clearInterval($soMonkeyTimer);
  });
});

$(function() {
  $("#so-chart").highcharts({
    chart:{
      type: "area"
    },
    title: {
      text: 'Comparison of following characters'
    },
    xAxis: {
      categories: $chars
    },
    yAxis: {
      title: {
        text: 'Relative probability'
      }
    },
    series: [{
      name: 'Empty',
    },
    {
      name: 'Monkey'
    }]
  });
});



/*  ===========================================================
    ===========================================================
                      third-order monkey

    - text analysis
      - make a 2x64000 matrix A
        - the first row holds all found trios of characters
        - the second row holds the frequency of the found trios
        - fill the first and second row in a loop
      - trim A to a 2x(64000 -x) matrix
      (- sort A (both rows!))
    - character generation
      - get the previous two typed characters XX
      - S = slice A to the part of third-order characters that start with XX
      - compute the sum FREQSUM of the frequencies of S
      - generate a random number RAND between 0 and FREQSUM
        - this number determines the next typed character
      - SUM = 0 
      - while(SUM < RAND)
        - check if we have reached the end of S, if yes break, if no continue
        - move pointer P in S to next column
        - add next frequency F to SUM
      - end while
      - type the character C where P points to
    - 
    ===========================================================
    =========================================================== */


currentWord = " ";
correctWords = 0;
fakeWords = 0;

var charMatrix = new Array(2);

// holds all third-order "chars"
charsCharsChars = new Array($chars.length * $chars.length * $chars.length);
for (var i = $chars.length - 1; i >= 0; i--) {
  for (var j = $chars.length - 1; j >= 0; j--) {
      for (var k = $chars.length - 1; k >= 0; k--) {
        charsCharsChars[i*40*40 + j*40 + k] = $chars[i] + $chars[j] + $chars[k];
      };
  };
};

/* toFoTextCharsTotal = new Array($chars.length);
for (var i = toFoTextCharsTotal.length - 1; i >= 0; i--) {
  toFoTextCharsTotal[i] = 0;
}; */

toSoTextCharsTotal = new Array($chars.length * $chars.length);
for (var i = toSoTextCharsTotal.length - 1; i >= 0; i--) {
  toSoTextCharsTotal[i] = 0;
};

toSoTextCharsTotalProb = new Array($chars.length * $chars.length);
for (var i = toSoTextCharsTotalProb.length - 1; i >= 0; i--) {
  toSoTextCharsTotalProb[i] = 0;
};

toTextChars = new Array($chars.length * $chars.length * $chars.length);
for (var i = toTextChars.length - 1; i >= 0; i--) {
  toTextChars[i] = 0;
};

toTextCharsProb = new Array($chars.length * $chars.length * $chars.length);
for (var i = toTextCharsProb.length - 1; i >= 0; i--) {
  toTextCharsProb[i] = 0;
}; 

var words = "";

$(document).ready(function(){
  
  // import lexicon
  $.get("res/british-english.txt", function(data) {
    words = data.split("\n");
    /* words = new Array(lines.length);
    var word = "";
    for (var i = lines.length - 1; i >= 0; i--) {
      if(lines[i].split(" ")[2] === undefined){
        words[i] = "";
      } else {
        words[i] = lines[i].split(" ")[2];
        words[i] = words[i].replace("]","");
        words[i] = words[i].replace("[","");
      }
    }; */
  }, "text");

  $("#to-save-text-input").click(function(){
    /* =================== OLD ===================
    var text = $("#to-text-input-text").val().toLowerCase();
    var index = 0;
    // count third-order characters
    for (var i = text.length - 1; i >= 0; i--) {
      index = charsCharsChars.indexOf(text[i-2] + text[i-1] + text[i]);
      toTextChars[index]++;
      index = $charsChars.indexOf(text[i-2] + text[i-1]);
      toSoTextCharsTotal[index]++;
      // index = $chars.indexOf(text[i-2]);
      // toFoTextCharsTotal[index]++;
    };
    // compute third-order characters probability
    var twoLeadingChars, indexOfTwoLeadingChars, totalOfTwoLeadingChars;
    for (var i = toTextCharsProb.length - 1; i >= 0; i--) {
      twoLeadingChars = charsCharsChars[i].slice(0,2);
      indexOfTwoLeadingChars = $charsChars.indexOf(twoLeadingChars);
      totalOfTwoLeadingChars = toSoTextCharsTotal[indexOfTwoLeadingChars];
      if(totalOfTwoLeadingChars !== 0){
        toTextCharsProb[i] = 0.0 + toTextChars[i] / totalOfTwoLeadingChars;
      } else {
        toTextCharsProb[i] = 0;
      }
    };
    for (var i = toTextCharsProb.length - 1; i >= 0; i--) {
      toSoTextCharsTotalProb[Math.floor(i/40)] += 0.0 + toTextCharsProb[i];
    }; 
      =================== OLD =================== */

    // reset matrix
    charMatrix[0] = new Array(64000);
    charMatrix[1] = new Array(64000);

    for (var i = charMatrix[0].length - 1; i >= 0; i--) {
      charMatrix[0][i] = undefined;
      charMatrix[1][i] = undefined;
    };

    // setup vars
    var text = $("#to-text-input-text").val().toLowerCase();
    var c = "";
    var index = 0;
    var insertAt = 0;

    // fill the matrix
    for (var i = text.length - 1; i > 1; i--) {
      // check if each character is valid
      if($.inArray(text[i], $chars) != -1 && $.inArray(text[i-1], $chars) != -1 && $.inArray(text[i-2], $chars) != -1) { 
        c = text[i-2] + text[i-1] + text[i];
        index = $.inArray(c, charMatrix[0]);
        if(index !== -1){ // this third-order character is already in the array
          charMatrix[1][index]++; // increase frequency of this third-order character
        } else {
          insertAt = charMatrix[0].indexOf(undefined); // find first empty cell
          charMatrix[0][insertAt] = c; // insert third-order character
          charMatrix[1][insertAt] = 1; // set frequency to 1 for this third-order character
        }
      }
    };

    // trim the empty part of the matrix
    charMatrix[0] = charMatrix[0].slice(0,insertAt + 1);
    charMatrix[1] = charMatrix[1].slice(0, insertAt + 1);

  });

  $("#to-start-button").click(function() {
    $toMonkeyTimer = window.setInterval(function() {
      if($("#to-monkey-text").text() === ""){
        $("#to-monkey-text").text($("#to-monkey-text").text() + charMatrix[0][Math.floor(Math.random()*charMatrix[0].length)].slice(0,2));
      } else {

        /* ================== OLD ==================
        // get index of two previous second-order char
        var text = $("#to-monkey-text").text();
        var twoPrevChars = text.slice(text.length-2, text.length);
        var indexTwoPrevChars = $charsChars.indexOf(twoPrevChars);
        
        // intialize probability sum
        var probSum = toTextCharsProb[indexTwoPrevChars * $chars.length];

        // get index of next third-order char
        var rand = Math.random() * toSoTextCharsTotalProb[indexTwoPrevChars];
        if(rand === 0){
          nextChar = $chars[Math.floor(Math.random()*40)];
        } else {
          for(i = 0; i < $chars.length && probSum < rand; i++){
            probSum += toTextCharsProb[i + 1];
          }
          var nextChar = charsCharsChars[indexTwoPrevChars + i];
        } 
          ================== OLD ================== */

        /*
        - character generation
          - get the previous two typed characters XX
          - S = slice A to the part of third-order characters that start with XX
          - compute the sum FREQSUM of the frequencies of S
          - generate a random number RAND between 0 and FREQSUM
            - this number determines the next typed character
          - SUM = 0 
          - while(SUM < RAND)
            - check if we have reached the end of S, if yes break, if no continue
            - move pointer P in S to next column
            - add next frequency F to SUM
          - end while
          - type the character C where P points to
        */

        /* ==================================================================
            get occuring third-order chars and their frequencies
           ================================================================== */

        // get the previous two typed characters
        var text = $("#to-monkey-text").text();
        var twoPrevChars = text.slice(text.length-2, text.length);

        // set up slice array
        matrixSlice = new Array(2);
        matrixSlice[0] = new Array($chars.length);
        matrixSlice[1] = new Array($chars.length);
        for (var i = matrixSlice[0].length - 1; i >= 0; i--) {
          matrixSlice[0][i] = undefined;
          matrixSlice[1][i] = undefined;
        };

        // slice the to the part of third-order characters that start with the previous two typed characters
        var insertAt = 0;
        var freqTotal = 0;
        for (var i = charMatrix[0].length - 1; i >= 0; i--) {
          if(twoPrevChars === charMatrix[0][i].substring(0,2)){ // check if current char matrix element starts with the correct chars
            insertAt           = matrixSlice[0].indexOf(undefined); // find spot to insert this item
            matrixSlice[0][insertAt] = charMatrix[0][i]; // copy third-order char
            matrixSlice[1][insertAt] = charMatrix[1][i]; // copy frequencey
            freqTotal          += charMatrix[1][i]; // increase sum of frequencies
          }
        };

        /* ==================================================================
            generate a new character
           ================================================================== */

        // generate a random number between 0 and the total of frequencies
        var rand = Math.floor(Math.random()*freqTotal);

        // find the next char: sum the frequencies until they exceed rand and take that character
        var indexNextChar = 0;
        var freqSum = matrixSlice[1][0];
        while(freqSum < rand){
          indexNextChar++;
          freqSum += matrixSlice[1][indexNextChar];
        }

        if(matrixSlice[0][indexNextChar] !== undefined) {
          var nextChar = matrixSlice[0][indexNextChar].slice(2); // take the last character of the trio as the next character
        } else {
          // if he somehow tpyed himself to a dead end, just start over
          var nextChar = charMatrix[0][Math.floor(Math.random()*charMatrix[0].length)].slice(0,2); 
        }

        /* ==================================================================
            type the new character and see if a word came out of it
           ================================================================== */

        $("#to-monkey-text").text(text + nextChar);

        if((nextChar === " " || nextChar === "!" || nextChar === "?" || nextChar === "," || nextChar === "." || nextChar === "\"" || nextChar === "\'") && currentWord !== ""){ 
        // we finished another word
          if($.inArray(currentWord, words) !== -1){
            correctWords += 1;
            $("#to-last-word").text(currentWord);
          } else {
            fakeWords += 1;
          }
          $("#to-word-ratio").text(correctWords.toString() + "/" + (correctWords + fakeWords).toString() + " (" + Math.round(((correctWords/(correctWords + fakeWords)) * 100)).toString() + "%)");
          currentWord = "";
        } else { // word not finished yet
          currentWord += nextChar;
        } 

        $("#to-current-word").text(currentWord);

      }
    }, 10);
  });
  
  $("#to-stop-button").click(function() {
    clearInterval($toMonkeyTimer);
  });

});

