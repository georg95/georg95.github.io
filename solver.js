var opts = 0;
var additional = false;

function AdditionalCase()
    {
    if(document.getElementById("addcase").checked)
        {
        document.getElementById("additional").style.display="";
        additional=true;
        }
    else
        {
        document.getElementById("additional").style.display="none";
        additional=false;
        }
    }
AdditionalCase();
function selchange(e)
    {
    if(e.options[e.selectedIndex].value == '^')
        {
        document.getElementById("val"+e.id.slice(3)).hidden=true;
        }
    else
        {
        document.getElementById("val"+e.id.slice(3)).hidden=false;
        }
    }
function SetOptions()
    {
    opts = parseInt(document.getElementById("opts").value) || 2;
    if (opts > 10 || opts < 1) { opts = 2; }
    var selects = document.getElementById("selects");
    selects.innerHTML="<br/>";
    for (var i = 0; i < opts; i++)
        {
        selects.innerHTML+="<select onchange=\"selchange(this);\" id =\"sel"+i+"\">"+
                            "<option value='+'>Прибавь</option>"+
                            "<option value='*'>Умножь на</option>"+
                            "<option value='^'>Возведи в квадрат</option>"+
                            "<option value='_'>Увеличь разряд числа на</option></select>"+
                            "<input type=\"number\" value="+
                            "\"2\" id=val"+i+"><br/>";
        }
    }
SetOptions();
function get_ways_count()
{
start  = 1;//prompt("Введите начальное значение", "1");
finish = 20;//prompt("Введите итоговое значение(должно быть больше начального)", "20");
start=document.getElementById("start").value;
finish=document.getElementById("finish").value;

var included = document.getElementById("included").value;
var excluded = document.getElementById("excluded").value;
if(!additional) { included=undefined; excluded=undefined; }
start=parseInt(start);
finish=parseInt(finish);
included=parseInt(included);
excluded=parseInt(excluded);
if(start == NaN || finish == NaN) { alert("Неправильный формат, введите числа"); return; }
var allopers=[];
var i = 0;
var opers = opts;
for(;i<opers;++i)
	{
	allopers[i] = {"oper":"", "value":NaN};
    var e = document.getElementById("sel"+i);
    allopers[i].oper=e.options[e.selectedIndex].value;
    allopers[i].value=parseInt(document.getElementById("val"+i).value);
	if(document.getElementById("val"+i).hidden) { allopers[i].value=2; }
    if (allopers[i].value == NaN)
		{ i--; alert("Неправильный формат"); return; }
	//console.log(allopers[i]);
    }

//console.log("opers = "+opers+"; from "+start+" to "+finish);
    
var thesolution = "РЕШЕНИЕ:<br/>";
thesolution+="способов ("+finish+") = 1<br/>";
var cells = [];
cells[finish] = 1;
for (var k = finish-1; k >= start; --k)
	{
	cells[k] = 0;
    var curr_solution = "";
    var short_solution = "";
	for (var i = 0; i < opers; ++i)
		{
		var lookpoint = 0;
		if (allopers[i].oper == '+') { lookpoint = k+allopers[i].value; }
		if (allopers[i].oper == '*') { lookpoint = k*allopers[i].value; }
        if (allopers[i].oper == '^') { lookpoint = k*k; }
        if (allopers[i].oper == '_')
            {
            var kk = ""+k;
            console.log(kk);
            for (var t = 0; t < kk.length; t++)
                {
                var p = parseInt(kk[t]);
                lookpoint *= 10;
                lookpoint += (p+allopers[i].value)>9?p:p+allopers[i].value;
                }
            }
        if(i !== 0) { curr_solution+=" + "; short_solution+=" + "; }
        curr_solution+="способов ("+k+allopers[i].oper+allopers[i].value+"="+lookpoint+")";
        short_solution+=""+(cells[lookpoint]||0);
		var ways = cells[lookpoint];
		if(ways != undefined) { cells[k] += ways; }
		}
	if(k === included)
        {
        for(var i = k+1; i < finish; i++) { cells[i]=0; }
        thesolution+="<br/>Теперь при вычислении нижней части(от "+(k-1)+" включительно) все значения выше этой строки равны 0(т.к."+k+" включено обязательно)<br/>";
        }
    if(k === excluded)
        { cells[k] = 0; thesolution+="способов ("+k+") = 0 (т.к. исключено из траектории)<br/>"; }
    else
        {
        thesolution+="способов ("+k+") = "+curr_solution+" = "+short_solution+" = "+cells[k]+"<br/>";
        if(k === included) { thesolution+="<br/>" }
        }

    }
document.getElementById("solution").innerHTML=thesolution;
document.getElementById("answer").value=cells[start];
}
