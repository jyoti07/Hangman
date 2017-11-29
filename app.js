var app=angular.module("HangmanApp",[]);
app.controller("GameCtrl",['$scope',function($scope){
var words = ["rat","cat","bat","mat"];
$scope.incorrectLetterList=[];
$scope.correctLettersList=[];
$scope.noOfGuesses = 6;
$scope.displayWord='';
$scope.input = {
	letter :''
}
var selectRandomWord = function(){
	var index = Math.round(Math.random()*words.length);
	return words[index];

}
var newGame = function(){
	$scope.incorrectLetterList=[];
	$scope.correctLettersList=[];
	$scope.noOfGuesses = 6;
	$scope.displayWord='';

	selectedWord = selectRandomWord();
	console.log(selectedWord);
	var tempDisplayWord = '';
	for (var i = 0; i < selectedWord.length; i++) 
	{
		tempDisplayWord += '*'
		console.log("inside 1st for in newGame");
	}
		console.log(tempDisplayWord);
		$scope.displayWord = tempDisplayWord;
   
}

$scope.letterChosen = function(){
console.log("working");
	for (var i = 0; i < $scope.correctLettersList.length; i++) 
	{
		console.log("inside for correct letter chosen")

		if ($scope.correctLettersList[i].toLowerCase()==$scope.input.letter.toLowerCase()) 
		{
			console.log("it matches");
			$scope.input.letter= "";
			return;
		}
		
	
    }

	for (var i = 0; i < $scope.incorrectLetterList.length; i++) 
	{
		console.log("inside for incorrect letter chosen")

		if ($scope.incorrectLetterList[i].toLowerCase()==$scope.input.letter.toLowerCase()) 
		{
			console.log("inside if incorrect")
			$scope.input.letter= "";
			return;
		}
		
	
    } 
    var correct = false;

    for (var i = 0; i < selectedWord.length; i++) {
    	console.log("inside selectword for loop")
       	if (selectedWord[i].toLowerCase()== $scope.input.letter.toLowerCase())		{
       		$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
       		
       		correct = true;

       	}
       } 
       
       if (correct){
       	$scope.correctLettersList.push($scope.input.letter.toLowerCase());		donutChart($scope.noOfGuesses);
       }  
       else {
       	$scope.noOfGuesses--;
       	$scope.incorrectLetterList.push($scope.input.letter.toLowerCase());		donutChart($scope.noOfGuesses);		
       }	   
       $scope.input.letter = ""
       if($scope.noOfGuesses == 0)	   {		   alert("You have exceeded maximum number of tries! Please Try again !");		   window.location.reload();		return;		}
       

       if($scope.displayWord.indexOf('*')== -1)	   {		   alert("Congratulations ! You won!")		   window.location.reload();	   }
       		
}var donutChart = function(noOfGuesses){	var percent = noOfGuesses;    var ratio=percent/6;    var pie=d3.layout.pie()            .value(function(d){return d})            .sort(null);    var w=300,h=300;    var outerRadius=(w/2)-10;    var innerRadius=85;    var color = ['#ececec','#f06b3e','#888888'];    var colorOld='#F00';    var colorNew='#00F';    var arc=d3.svg.arc()            .innerRadius(innerRadius)            .outerRadius(outerRadius)            .startAngle(0)            .endAngle(Math.PI);    var arcLine=d3.svg.arc()            .innerRadius(innerRadius)            .outerRadius(outerRadius)            .startAngle(0);		d3.select("svg").remove();     var svg=d3.select("#chart")            .append("svg")            .attr({                width:w,                height:h,                class:'shadow'            }).append('g')            .attr({                transform:'translate('+w/2+','+h/2+')'            });    var path=svg.append('path')            .attr({                d:arc,                transform:'rotate(-90)'            }).attr({                'stroke-width':"1",                stroke:"#666666"            })            .style({                fill:color[0]            });    var pathForeground=svg.append('path')            .datum({endAngle:0})            .attr({                d:arcLine,                transform:'rotate(-90)'            })            .style({                fill: function (d,i) {                    return color[1];                }            });    var middleCount=svg.append('text')            .datum(0)            .text(function(d){                return d;            })            .attr({                class:'middleText',                'text-anchor':'middle',                dy:0,                dx:5            })            .style({                fill:d3.rgb('#000000'),                'font-size':'60px'            });    var oldValue=0;    var arcTween=function(transition, newValue,oldValue) {        transition.attrTween("d", function (d) {            var interpolate = d3.interpolate(d.endAngle, ((Math.PI))*(newValue/6));            var interpolateCount = d3.interpolate(oldValue, newValue);            return function (t) {                d.endAngle = interpolate(t);                middleCount.text(Math.floor(interpolateCount(t)));                return arcLine(d);            };        });    };    pathForeground.transition()            .duration(750)            .ease('cubic')            .call(arcTween,percent,oldValue);	}//Include alert message
function CustomAlert() {    this.show = function (dialog) {        var winW = window.innerWidth;        var winH = window.innerHeight;        var dialogOverlay = document.getElementById('dialog-overlay');        var dialogBox = document.getElementById('dialog-box');        dialogOverlay.style.display = "block";        dialogOverlay.style.height = winH + "px";        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";        dialogBox.style.top = "100px";        dialogBox.style.display = "block";        document.getElementById('dialog-box-head').innerHTML = "Acknowledge This Message";        document.getElementById('dialog-box-body').innerHTML = dialog;        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Alert.ok()">OK</button>';    }    this.ok = function () {        this.hide();    }    this.hide = function () {        document.getElementById('dialog-box').style.display = "none";        document.getElementById('dialog-overlay').style.display = "none";    }}
newGame();donutChart($scope.noOfGuesses);

//Include donut d3 js code			}]);