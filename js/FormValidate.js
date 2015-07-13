/* 
Work Done:  
---------------------------------------------
For distribution purpose please add your comments at the file level. Thanks. 
---------------------------------------------
----------------------------------------------
----------------------------------------------
---------------------------------------------
Author: Yaniv Mishni
Date: 	10/21/2013
Ticket:	51898
Work:   Add 'SIGN' case to match field format when field is validated (isFieldInRightFormat function)
----------------------------------------------
----------------------------------------------
Author: Dror/Warren
Date: 	09/01/2010
Ticket:	57863
Work:   Modified IsFieldInRightFormat function in order to fix a bug in the Month format check
----------------------------------------------
----------------------------------------------
Author: Tracy Agnello
Date: 	05/05/2010
Ticket:	55947
Work:   While checking if the field value is valid, for case AN (Alpha Numeric) check was added by David if the Field is blank to return error
	TA added to check if All Spaces for AN (Not Null) to return error as well
----------------------------------------------
----------------------------------------------

Author: David Vanunu
Date: 	12/14/2009
Ticket:	56330
Work:   Popup calendar issues - When a value in a field changes and then the focus moves from the field to another element in the UI the COMET required 
		flag is being triggered which causes an error message that the field is required. This has been addressed when the comet required is triggered 
		we are checking if the popup calendar is on - if it is on that means that the user still working with the field so we mute the message. 
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 10/28/2009
Ticket:	 55310
Purpose: Implement Max date (all dates entered must be smaller than 01/01/2100)
---------------------------------------------
----------------------------------------------
----------------------------------------------

---------------------------------------------
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 10/30/08 4:48 pm
Ticket:	 52981 
Purpose: fixed bug in midnight validation 
---------------------------------------------
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 10/23/08 4:52 pm
Ticket:	 52981 
Purpose: additions to ticket 49062 - made changes to am/pm formatting according to the ticket 
52981 examples provided by doron and eileen. (see excel spreadsheet and dorons comments in the ticket). 
---------------------------------------------
----------------------------------------------
----------------------------------------------

----------------------------------------------
---------------------------------------------
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 09/02/08 11:30 pm
Ticket:	 52981 
Purpose: additions to ticket 49062 - add validation for midnight. 
---------------------------------------------
----------------------------------------------
----------------------------------------------

---------------------------------------------
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 08/28/08 4:06 PM   
Ticket:	 52981 
Purpose: additions to ticket 49062 - addressed pm/am issues when working in 12 hr format mode. 
---------------------------------------------
----------------------------------------------
----------------------------------------------


---------------------------------------------
----------------------------------------------
----------------------------------------------
Author:  David Vanunu
Date: 	 08/04/08 10:26 pm 
Ticket:	 49062 
Purpose: additions to ticket 49062 - validates and formats  24 hours time input. 
---------------------------------------------
----------------------------------------------
----------------------------------------------
Author: David Vanunu
Date: 	07/16/2008
Ticket:	49062
Work: 	Introduced a new function applytimeformat which encapsulates all functionality of 
        the formatTime - the timeFormat has the format flag emedded in the function so had 
        to introduce a new function to allow time formatting at will. 
        applyTimeFormat(time,timeFormatFlag)
        timeFormat stayed the same (i.e. interface is preserved).                 
----------------------------------------------
----------------------------------------------

----------------------------------------------
----------------------------------------------
Author: David Vanunu
Date: 	04/07/2008
Ticket:	50017
Work: 	made changes to function isFieldInRightFormat - allow numeric type of fields to contain dashes in them. 
        Once a dash is entered the field is poupulated with dashes which correspond to the max length of the field.         
        
----------------------------------------------
----------------------------------------------

----------------------------------------------
----------------------------------------------
Author: David Vanunu
Date: 	01/09/2008
Ticket:	50915
Work: 	In a field of type float when a user enters a value bigger than -1 and less than 0 
        the negative sign is not being preserved. This ticket addresses the issue of values 
        between  0>x>-1. 
        Function fixed: function formatFloat(num,js) 
----------------------------------------------
----------------------------------------------
*/

/*
 max date implementation.  
*/
var MAX_DATE =formatDate("01/01/2100"); 
//Check if the date provided is smaller than the MAX_DATE 
//Dates allowed to be entered to the system are up to end of 2099. 
function isDateSmallerThanMaxDate(dateInfo) 
{
	 var valid=false;
	 var newDate=new Date(MAX_DATE); 
	 var newDateInfo=new Date(dateInfo);	 
	 if (newDate>newDateInfo) 
		valid=true; 
	 return valid;
}


var MIN_DATE =formatDate("12/31/1840"); 
//Check if the date provided is greater than the MIN_DATE 
//Dates allowed to be entered to the system not before 
function isDateBiggerThanMinDate(dateInfo) 
{
	 var valid=false;
	 var newDate=new Date(MIN_DATE); 
	 var newDateInfo=new Date(dateInfo);	 
	 if (newDate<newDateInfo) 
		valid=true; 
	 return valid;
}

//Check if the month/year provided is smaller than the MAX_DATE 
//Dates allowed to be entered to the system are up to end of 2099. 
function isMonthSmallerThanMaxMonth(monthInfo) 
{   		
	var upperDateFlag=isDateSmallerThanMaxDate("01/"+monthInfo); 
	var lowerDateFlag=isDateBiggerThanMinDate("01/"+monthInfo); 
	if (!upperDateFlag || !lowerDateFlag)
		return false;
		else
		return true;
	//return isDateSmallerThanMaxDate("01/"+monthInfo); 
}


//-------------------------------
// validateField(field) 
// returns Boolean
//-------------------------------
//
// If field disabled or has no id returns true
// If field in error:
// 1. Display error message to user
// 2. Set return value to false
// 3. If field is not a hidden field setfocus on to it
// 4. Returns false
//-------------------------------
function validateField(field) {
  var ef = true;
  // if field disabled or elements has 
  // no id assigned to it return true (field is valid)
  if (!checkField(field)) return ef;
  
  // Validate the field (recieve empty string if ok, otherwise error string)
  var e = isFieldValid(field);
  // Analyze return value: 
  // - if ok (empty string) return true
  // - otherwise display message to user and sets
  //   focus back to faild field if it is not a 
  //   hidden field. Finally returns false
  if (e != "") { ef = false; alert(e); if (field.type != "hidden") field.focus(); }
  return ef;
}


//-------------------------------
// validateAllFields(formName)
// returns Validation Object - Is User Input Valid and The Error Message to the user (if any). 
//-------------------------------
//David Vanunu 
//Date: 01/22/07 
//Validate user input and returns a validation object which contains if the input is valid 
// and if error message to the user. 
function validateAllFieldsReturnValidationObject(formName) {
  var e = "";
  var ef = true;
  var m = "";
  var field;
  var fieldFocus = null;
  //loop through all elements on the form
  for (var i=0; i<formName.elements.length; i++) {
  //current element
    field = formName.elements(i);
    // bypass disabled fields and 
    // elements which have no id assigned to them 
    if (!checkField(field)) continue;
    
    //check validity of field
    e = isFieldValid(field);
    
    //now if field not valid
    //add error to message, and set focus to offending field
    if (e != "") { m += "\n" + e; if (fieldFocus == null) fieldFocus = field; }
  }//end loop through all elements on the form
  
  // if message text is empty return true
  // if message text is available then there is an error page
  // If field in error:
  // 1. Display error message to user
  // 2. Set return value to false
  // 3. If field is not a hidden field setfocus on to it
  // 4. Validation Object. 

    var validationObject=new Object() 
	validationObject.IsUserInputValid=true; 
	validationObject.ErrorMessage=""; 	
	if (m != "") 
  	{	 
		validationObject.IsUserInputValid=false; 
		validationObject.ErrorMessage=m; 
		if (fieldFocus.type != "hidden") 
			fieldFocus.focus(); 
	}
	return validationObject;
}


//-------------------------------
// validateAllFields(formName)
// returns Boolean
//-------------------------------
//oded 08/29/2006
// validates all fields on the parameter given (formName)
function validateAllFields(formName) {
	
 	var validationObject=validateAllFieldsReturnValidationObject(formName); 
	if(!validationObject.IsUserInputValid) 
		alert(validationObject.ErrorMessage); 
	return validationObject.IsUserInputValid; 
	/*
  var e = "";
  var ef = true;
  var m = "";
  var field;
  var fieldFocus = null;
  //loop through all elements on the form
  for (var i=0; i<formName.elements.length; i++) {
  //current element
    field = formName.elements(i);
    // bypass disabled fields and 
    // elements which have no id assigned to them 
    if (!checkField(field)) continue;
    
    //check validity of field
    e = isFieldValid(field);
    
    //now if field not valid
    //add error to message, and set focus to offending field
    if (e != "") { m += "\n" + e; if (fieldFocus == null) fieldFocus = field; }
  }//end loop through all elements on the form
  
  // if message text is empty return true
  // if message text is available then there is an error page
  // If field in error:
  // 1. Display error message to user
  // 2. Set return value to false
  // 3. If field is not a hidden field setfocus on to it
  // 4. Returns false

  if (m != "") { ef = false; alert(m); if (fieldFocus.type != "hidden") fieldFocus.focus(); }
  return ef;
  */
}


//-------------------------------
// checkField(field) 
// returns Boolean
//-------------------------------
// Oded 08/29/2006
// checkField - test if the parameter given (field) has id and 
// if the field is enabled. If both conditions are met (true)
// checkField function returns true, otherwise false
function checkField(field) {
  if ((field.id != "") && (field.disabled != true)) return (true)
  else return (false)
}


//-------------------------------
// isFieldValid(field) -
// runs following tests on the parameter given (field):
// - is field required?
// - is format required and if so is field format correct?
// - is it date field which cannot be in future? if so is value in future?
// - is field has value list and value not OK 
// - is field min or max and value entered does not meet requirement
// In all cases returns:  
// Empty string if ok 
// Error string if not
//-------------------------------
// Oded 08/29/2006
function isFieldValid(field) {
// use conditional operator: condition ? val1 : val2 
// If condition is true, the operator has the value of val1. 
// Otherwise it has the value of val2
// So, if field.COMETHeader not null use value from field.COMETHeader
// otherwise field.id
  var fieldHeader = (field.COMETHeader != null ? field.COMETHeader : field.id);
  
  // if field required and the field is blank, return error messge
  if ((field.COMETRequired == "1") && (isFieldBlank(field))) {
	if(!isCalendarPopupVisible(field,false))
		return ("'" + fieldHeader + "' is Required");
  }
  // if field requires specific format and the field format is wrong,
  // return error messge
  if ((field.COMETFormat != null) && (isFieldInRightFormat(field) == false)) {
    return ("Wrong Format of '" + fieldHeader + "'");
  }
  // if field is date field which must not be in the future 
  // and the field is future date, return error messge
  if ((field.COMETDateNiF == "1") && (isFieldInFuture(field))) {
    return ("'" + fieldHeader + "' cannot be In Future");
  }
  // if field has value list and value not OK , return error messge
  if ((field.COMETValueList != null) && isFieldValueNotOK(field)) {
    return ("'" + fieldHeader + "' has wrong Value'");
  }
  // if field requires min value and 
  // value entered less then min, return error messge
  if ((field.COMETValueMin != null) && isFieldValueMin(field)) {
    return ("'" + fieldHeader + "' cannot be less than " + field.COMETValueMin);
  }
  
  // if field requires max value and 
  // value entered exceeds the max, return error messge
  if ((field.COMETValueMax != null) && isFieldValueMax(field)) {
    return ("'" + fieldHeader + "' cannot be greater than " + field.COMETValueMax);
  }
  //otherwise return an empty string
  return ("");
}

/*
Author: David Vanunu
Date: 	12/14/2009
Ticket:	56330
Work:   Checks if the field has a visible calendar popup 
*/
function isCalendarPopupVisible(field,hideCalendar)
{    	
	if(!(parent.COMETMain._pageCalendarObjects=="undefined"))
	{
		if(field.calendar)
		{
			if (!(parent.COMETMain._pageCalendarObjects[field.id]==undefined))
			{
				//if(hideCalendar)
				//	parent.COMETMain._pageCalendarObjects[field.id].hide(); 
				return parent.COMETMain._pageCalendarObjects[field.id].isVisible();			
			}
		}
	}
}


//-------------------------------
// isFieldValueMin(field) 
// returns Boolean
//-------------------------------
function isFieldValueMin(field) {
  if ((field.COMETFormat != "N") && (field.COMETFormat != "F") && (field.COMETFormat != "F1")&& (field.COMETFormat != "F4")) return false;
  if (isFieldBlank(field)) return false;
  if (field.value < (field.COMETValueMin-0)) return true;
  return false;
}


//-------------------------------
// isFieldValueMax(field) 
// returns Boolean
//-------------------------------
function isFieldValueMax(field) {
  if ((field.COMETFormat != "N") && (field.COMETFormat != "F") && (field.COMETFormat != "F1")&& (field.COMETFormat != "F4")) return false;
  if (isFieldBlank(field)) return false;
  if ((field.COMETValueMax-0) < field.value) return true;
  return false;
}
  

//-------------------------------
// isFieldBlank(field) 
// returns Boolean
//-------------------------------
function isFieldBlank(field) {
  var b = true;
  switch (field.type) {
    case "text" :
      b = (field.value == "");
      break;
    case "textarea" :
      b = (field.value == "");
      break;
    case "checkbox" :
      var checkBoxes = document.getElementsByName(field.name);
      if (field != checkBoxes[0]) { b = false; break; }
      if (checkBoxes.length > 1) b = isFieldsBlank(checkBoxes);
      else b = (field.checked == false);
      break;
    case "radio" :
      var radioButtons = document.getElementsByName(field.name);
      if (field != radioButtons[0]) { b = false; break; }
      if (radioButtons.length > 1) b = isFieldsBlank(radioButtons);
      else b = (field.checked == false);
      break;
    case "select" :
      b = (field.value == "");
      break;
    case "select-one" :
      b = (field.value == "");
      break;
    case "select-multiple" :
      b = (field.value == "");
      break;
    case "hidden" :
      b = (field.value == "");
      break;
    default :
      b = false;
  }
  return (b);
}


//-------------------------------
// isFieldsBlank(fields) 
// returns Boolean
//-------------------------------
function isFieldsBlank(fields) {
  var b = true;
  for (var i=0; i<fields.length; i++) if (fields[i].checked) { b = false; break; }
  return (b);
}


//-------------------------------
// isFieldInFuture(field)
// returns Boolean
// - if paramenter field empty ("") returns false
// otherwise checks "COMETFormat" and returns:
// - if less then 0 (value is not a valid date) returns false
// - if date in future returns false
//-------------------------------
function isFieldInFuture(field) {
  var date = field.value; if (date == "") return (false);
  switch (field.COMETFormat) {
    case "D" :
      date = formatDate(date);
      break;
    case "DMY" :
      date = formatDateMonthYear(date); if (date < 0) break;
      if (date.match(/^\d{4}$/)) date = "01/01/" + date;
      if (date.match(/^(\d{1,2})(\/?)(\d{0,4})$/)) {
        var m = RegExp.$1; var y = RegExp.$3;
        if (app.dateFormat == "mm/dd") date = m + "/01/" + y;
        else date = "01/" + m + "/" + y;
      }
      else date = formatDate(date);
      break;
  }
  return (date < 0 ? false : dateInFuture(date));
}


/*
Author: David Vanunu
Date: 	04/07/2008
Ticket:	50017
Work:   For field of type "N" i have added the ability to enter dashes. If a dash is entered 
        we allow it - and we poupulate the field with number of dashes corresponding to the 
        field maxLength. 
*/
function isFieldInRightFormat(field) {
  if (field.value == "") return (true);
  var valid = true;
  switch (field.COMETFormat) {
    case "C" :
      field.value = field.value.toUpperCase();
      break;
    case "F1" :
      var num = formatFloat(field.value,1);
      if (num == "") valid = false;
      else field.value = num;
      break;
    case "F" :
      var num = formatFloat(field.value,2);
      if (num == null) valid = false;
      else field.value = num;
      break;
    case "F4" :
      var num = formatFloat(field.value,4);
      if (num == null) valid = false;
      else field.value = num;
      break;
    case "N" :                                         
        if ((typeof parent.COMETMain.MDSValidation=="undefined"))
        {                         
               var num = formatNumeric(field.value);
                if (num == null) valid = false;
                else field.value = num;                         
        } 
        else
        {   
            var fieldContent=field.value;
	        if(fieldContent.indexOf("-")>-1) 
	        {	        	        
	            var newContent="";	        
			    for(i=0; i<field.maxLength; i++) 
			    {
				    newContent=newContent + "-"; 
			    }
			    field.value=newContent; 			
			    valid=true; 			
	        }
	        else
	        {
		        var num = formatNumeric(field.value);
		        if (num == null) 
		        {
		            valid = false;
		         }
		         else 
		         {		        
		            field.value = num;
		         }	        
            }
          }
      break;
    case "D" :
      var date = formatDate(field.value);      
      if (date < 0 || (!isDateSmallerThanMaxDate(date))  || (!isDateBiggerThanMinDate(date))        ) valid = false;
      else field.value = date;
      break;
    case "DAY":
      var date = formatDay(field.value);
      if (date < 0) valid = false;
      else field.value = date;
      break;
    case "M" :
      var month = formatMonth(field.value);
      if (month < 0) valid = false;
      else {
        var monthWithDay=month.substring(0,2) + '/01' + month.substring(2);
        if (!isDateBiggerThanMinDate(monthWithDay) || !isDateSmallerThanMaxDate(monthWithDay)) valid = false;
      }
      if (valid!=false)
        field.value = month;
      break;
    case "DMY" :
      var date = formatDateMonthYear(field.value);
      if (date < 0) valid = false;
      else field.value = date;
      break;
    case "H" :
      var hour = formatHour(field.value);
      if (hour < 0) valid = false;
      else field.value = hour;
      break;
    case "MI" :
      var min = formatMinutes(field.value);
      if (min < 0) valid = false;
      else field.value = min;
      break;
    case "T" :
      var time=formatTime(field.value);
      if (time < 0) valid=false;
      else field.value = time;
      break;
    case "SSN" :
      var ssn = formatSSN(field.value);
      if (ssn < 0) valid=false;
      else field.value = ssn;
      break;
    case "PHONE" :
      var phone = formatPhone(field.value);
      if (phone < 0) valid=false;
      else field.value=phone;
      break;
    case "ZIP" :
      var zip = formatZip(field.value);
      if (zip < 0) valid=false;
      else field.value = zip;
      break;
	case "AN":
		// new case AN (Alpha Numeric) defined under ticket 55947 (David V.)	
		// check for Blank Value is added under ticket 55947      (David V.)
		if (isFieldBlank(field))
		{
			valid=false; 
			break;
		}
		tempFieldValue=field.value; 						
		tempFieldValue=(tempFieldValue).replace(/^\s*|\s*$/g,'');			
		if(!(tempFieldValue==''))
		{	
			var regex=/^[0-9a-zA-Z]+$/;
			if(!regex.test(field.value)) valid=false; 				 	
		}
		// Added below to check for all spaces entered then tempFieldvalue will equal null ticket 55947 (Tracy A)
		if(tempFieldValue=='') valid=false;
	 	break; 
	 case "DW":
	 	// in the next round this needs refactoring to get it with the program:) 
		var fieldValue=field.value; 
		 // We are checking is the * or the ? mark exist if they do not exist then we 
		 // do a regular date check 
		if((!doesTheCharacterExists("*", fieldValue)) && (!doesTheCharacterExists("?", fieldValue)))
		{
			// need refactoring here 
			var date = formatDate(field.value);      
      		if (date < 0 || (!isDateSmallerThanMaxDate(date)) || (!isDateBiggerThanMinDate(date))  ) valid = false;
      		else field.value = date;
		}
		else
		{
	    	var asciiValue; 
		 	for(var charIndex=0; charIndex < fieldValue.length; charIndex++) 
			{
				asciiValue=fieldValue.charCodeAt(charIndex); 
				if(!((asciiValue==47) || (asciiValue==63) || (asciiValue>47 && asciiValue<58) || (asciiValue==42) ||(asciiValue==32)))
				{
					valid=false; 
					charIndex=fieldValue.length; 
				}
			}
		}
	 	break; 
    case "SIGN" :
        // new case SIGN (Signature) defined under ticket 51898 (Yaniv)	
		// Currently do nothing but preventing JS error
      break;
    default :
      if (field.value.match(eval(field.COMETFormat)) == null) valid = false;
      break;
  }
  return (valid);
}

function doesTheCharacterExists(characterToSearch, stringToSearch) 
{
	var foundCharacter=false; 
	for(var i=0; i<stringToSearch.length; i++) 
	{
		if (!(characterToSearch.charCodeAt(0)!=stringToSearch.charCodeAt(i)))
		{
			foundCharacter=true; 
		}
	}
	return foundCharacter; 
}

//-------------------------------
//
//-------------------------------
function isFieldValueNotOK(field) {
  if (field.value == "") return (false);
  var nok = true;
  var vl = field.COMETValueList;
  var va = vl.split(";");
  for (var i=0; i<va.length; i++) if (field.value == va[i]) { nok = false; break; }
  return (nok)
}

//--------------------------------------------------------------------------------------
// Formatting functions: 
//--------------------------------------------------------------------------------------
//-------------------------------
//
//-------------------------------
function formatNumeric(num) {
  if (num == "") return "";
  var n = parseInt(num,10);
  if (isNaN(n)) return null;
  return (n + "");
}

/*
Author:  David Vanunu
Date: 	 01/09/2008 2:06 PM
Ticket:	 50915 
Purpose: Account for numbers between 0 and -1 which were not saved correctly. Before the fix the (-) sign was 
         removed now the (-) is being preserved. 
*/
function formatFloat(num,js) {
  var originalValue=num; 
  var p = match(num,"[.]"); var d = "0"; if (p >= 0) { d = num.substring(p+1,num.length+1); num = num.substring(0,p); }
  if ((num == "") || (isNaN(num))) num = "0";
  if ((d == "") || (isNaN(d))) d = "0";    
  d = "" + (parseFloat("0."+d)+Math.pow(0.1,10));    
  var newNum=parseInt(num,10); 
  var numStr="";
  if((originalValue>-1) && (originalValue<0))
  {
    numStr="-" + newNum; 
  }
  else
  {
    numStr=newNum; 
  }
  var result=(numStr+ "." + d.substring(2,2+js));    
  return result; 
}

//-------------------------------
//
//-------------------------------
function formatHour(hour) {
  var m = match(hour,"[:]");
  var f = parseFloat(hour);
  if ((m < 0) && !isNaN(f)) {
    hour = hour.replace(eval("/[^ 0-9.\-]/g"),"");
    var m = match(hour,"[.]"); var min = "0";
    if (m >= 0) { min = hour.substring(m+1,hour.length); hour = hour.substring(0,m) };
    min = parseInt(parseFloat("0." + min) * 60);
  }
  else {
    hour = hour.replace(eval("/[^ 0-9:\-]/g"),"");
    var m = match(hour,"[:]"); var min = "0";
    if (m >= 0) { min = hour.substring(m+1,hour.length); hour = hour.substring(0,m) };
  }
  if (min > 59) return (-1000);
  min = parseInt(min,10); if (min < 10) min = "0" + min;
  return (hour + ":" + min);
}

//-------------------------------
//
//-------------------------------
function formatMinutes(min) {
  var m = ""; var s = "";
  if (min.match(/^(\d+)([:]?)(\d{2})$/)) { m = RegExp.$1; s = RegExp.$3; }
  else {
    if (min.match(/^\d{1,2}$/)) { m = min; s = 0; }
    else return -1;
  }
  m = m - 0; s = s - 0;
  if (s > 59) return -1;
  return m + ":" + (s < 10 ? "0" + s : s);
}

//-------------------------------
//Description: Format a text node if there is no value. 
//-------------------------------
function formatTextNode(nodeValue) 
{
	if(nodeValue!=null) 
	{
		return nodeValue; 
	}
	else
	{
		return ' '; 
	}
}

/*
Author:  David Vanunu
Date: 	 07/16/08 1:15 PM. 
Ticket:	 49062 
Purpose:Introduced a new function applytimeformat which encapsulates all functionality of 
the formatTime - the timeFormat has the format flag emedded in the function so had 
to introduce a new function to allow time formatting at will. 
applyTimeFormat(time,timeFormatFlag)
timeFormat stayed the same (i.e. interface is preserved).  
*/
// apply time formating to incoming time value based on 12 or 24 hours flag.
function applyTimeFormat(time, timeFormatFlag) {
    if (time == "") return "";
    if (time.match(/^[Nn][+-]{0,1}\d{0,}$/i) != null) return convertTime(time, "h:m");
    var h; var m;
    var tempTime = time.toLowerCase();
    switch (timeFormatFlag) {
        case "12":
            time = time.replace(/\s/g, "");
            time = time.toLowerCase();
            var p = time.match(/[a]|[am]|[p]|[pm]/i);
            time = time.replace(/\D/g, "");
            if (time.length == 3) {
                if (time.charCodeAt(0) == 48)
                    time = "0" + time;
            }
            if (time.length < 3) {
                time = time + "00";
            }
            //========================================
            // do validate midnight
            //========================================
            var isMidnight = validateIsMidnight(time);            
            if (!isMidnight) {
                var amValue = tempTime.match(/[a]|[am]/i);
                if (amValue != null)
                    isMidnight = true;
            }
            if (isMidnight) {
                p = "a";
            }
            else {
                if (time.charCodeAt(0) == 49 && time.charCodeAt(1) == 50) {
                    p = "p";
                }
                else {
                    p = (p == null ? "a" : p);
                }
            }
            //========================================
            
            if (time.match(/^(\d{1,2})(\d{2})$/) && (RegExp.$1 < 13) && (RegExp.$2 < 60)) {
                var l = time.length;
                h = time.substr(0, l - 2) - 0; m = time.substr(l - 2, 2) - 0;
                return convertTime((h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + p, "h:m");
            }
            if (time.match(/^(\d{1,2})(\d{2})$/) && (RegExp.$1 < 24) && (RegExp.$2 < 60)) {
                var l = time.length;
                h = time.substr(0, l - 2) - 0; m = time.substr(l - 2, 2) - 0;
                return convertTime((h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m), "h:m");
            }
            return -1;
            break;
        case "24":            
            var p = tempTime.match(/[a]|[am]|[p]|[pm]/i);
            //if user input is in am /pm format we go ahead and format it as 24 hours. 
            if (p != null) {
                //we first validate the time as AM and PM
                var validTime = applyTimeFormat(tempTime, "12");
                //if time is valid in AM/PM we go ahead and convert it to 24 hours
                if (validTime != -1) {
                    var tempDateTime = new Date("01/01/2008 " + validTime);
                    var hours = tempDateTime.getHours();
                    var minutes = tempDateTime.getMinutes();
                    //
                    if (hours < 10)
                        hours = "0" + hours;
                    if (minutes < 10)
                        minutes = "0" + minutes;
                    //check for 12:00 AM
                    var isAM = tempTime.substr(p.index, 1)
                    if ((isAM == "a") && (hours == 12)) {
                        hours = "00";
                    }
                    validTime = convertTime(hours + ":" + minutes, "h:m");
                    return validTime;
                }
                return validTime;
            }
            else {
                return validateAndFormat24HoursTimeInput(time);
            }
            break;
        default: return -1;
    }
}

/*
Author:  David Vanunu
Date: 	 02/09/08 11:30 pm  
Ticket:	 52981 
Purpose: validate if the time is in the midnight range for 12 hours format. 
*/
function validateIsMidnight(timeInfo) {

    var zeroCounter = 0;
    var charsToCount = timeInfo.length;
    var midnight = false;    
    if (timeInfo.length > 2) {
        charsToCount = 2;
    }
    for (ci = 0; ci < charsToCount; ci++) {
        if (timeInfo.charCodeAt(ci) == 48) {
            zeroCounter++;
        }
    }
    if (zeroCounter == charsToCount) {
        midnight = true;
    }
    return midnight;
}





/*
Author:  David Vanunu
Date: 	 08/04/08 10:26 pm 
Ticket:	 49062 
Purpose: validates and formats aa 24 hours time input. 
*/
function validateAndFormat24HoursTimeInput(theTime) {
    var tmpTime = new String(theTime);
    var newTime = "";
    if (tmpTime.length > 2 && tmpTime.indexOf(":") < 0) {
        //handle 00** template
        if (tmpTime.length == 3 && tmpTime.charCodeAt(0) == 48 && tmpTime.charCodeAt(1) == 48) {
            newTime = tmpTime.substring(0, 2) + ":0" + tmpTime.substring(2, 3);
        }
        //handle 0*** template
        else if (tmpTime.length == 3 && tmpTime.charCodeAt(0) == 48) 
        {
            newTime = "00:" + tmpTime.substring(1, tmpTime.length);
        }
        else {
            newTime = tmpTime.substring(0, 2) + ":" + tmpTime.substring(2, tmpTime.length);
        }
        return validateAndFormat24HoursTimeInput(newTime);
    }
    if (tmpTime.indexOf(":") < 0) {
        if (parseInt(tmpTime, 10) < 24) 
        {
            if (tmpTime.length == 2)
                newTime = new String(tmpTime + ":00");
            else {
                if (tmpTime.length > 2) {
                    newTime = tmpTime.substring(0, 2) + ":" + tmpTime.substring(2, tmpTime.length);
                }
                else {
                    newTime = new String("0" + tmpTime + ":00");
                }
            }
        }
        else {
            newTime = "-1";
        }
    }
    else {
        var spl = tmpTime.split(":");
        if (parseInt(spl[0], 10) < 24 && parseInt(spl[1], 10) < 60) {
            newTime = tmpTime;
        }
        else {
            newTime = "-1";
        }
    }
    return newTime;
}

function formatTime(time) 
{
   return applyTimeFormat(time, app.timeFormat);     
}

//-------------------------------
//
//-------------------------------
function formatMonth(month) {
  /*  month: MM/YYYY  MM/YYYY
             MM/YY    MM/{current century}YY
             MMYYYY   MM/YYYY
             MMYYYY   NN/NN/{current century}YY
  */
  if (month == "") return "";
  var m = ""; var y = "";
  var dateObj = new Date();
  if (month.match(/^(\d{1,2})(\/?)(\d{0,4})$/)) {
    m = RegExp.$1; y = RegExp.$3;
    if (m<10) m = "0"+(m-0);
    if (y.length < 4) y = (""+dateObj.getFullYear()).substr(0,4-y.length) + y;
  }
  else return -1;
  if (m < 1 || m > 12) return -1;
  else return (m + "/" + y);
}

//-------------------------------
//
//-------------------------------
function formatDay(date) {
  date = date.replace(eval("/[^0-9]/g"),"");
  var dateObj = new Date();
  if (date.length < 4) return (-1);
  var month = parseInt(date.substring(0,2),10); if (isNaN(month)) return (-1);
  var day = parseInt(date.substring(2,4),10); if (isNaN(day)) return (-1);
  if (month > 12) return (-1);
  var days = "312931303130313130313031";
  var lastDay = days.substring((month-1)*2, (month-1)*2+2);
  if (day > lastDay) return (-1);
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return (month + "/" + day);
}

//-------------------------------
//
//-------------------------------
function formatDate(date) {
  /*  date: T+-n        today +- n days
            NN/NN/YYYY  NN/NN/YYYY
            NN/NN/YY    NN/NN/{current century}YY
            NNNNYYYY    NN/NN/YYYY
            NNNNYY      NN/NN/{current century}YY
            NNNN        NN/NN/{current year}
      app.dateFormat    mm/dd | dd/mm
  */
  if (date == "") return "";
  if (date.match(/^[Tt][+-]{0,1}\d{0,}$/) != null) return convertDate(date, "m/d/y");
  var m = ""; var d = ""; var y = "";
  var dateObj = new Date();
  if (date.match(/^(\d{1,2})(\/?)(\d{1,2})(\/?)(\d{0,4})$/)) {
    if (app.dateFormat == "mm/dd") { m = RegExp.$1; d = RegExp.$3; }
    else { m = RegExp.$3; d = RegExp.$1; }
    y = RegExp.$5;
    if (m<10) m = "0"+(m-0);
    if (d<10) d = "0"+(d-0);
    if (y.length < 4) y = (""+dateObj.getFullYear()).substr(0,4-y.length) + y;
  }
  else return -1;
  if (m < 1 || m > 12) return -1;
  var days = "312831303130313130313031";
  var lastDay = days.substr((m-1)*2, 2); if ((m == 2) && isLeapYear(y)) lastDay=29;
  if (d < 1 || d > lastDay) return -1;
  if (app.dateFormat == "mm/dd") return (m + "/" + d + "/" + y);
  else return (d + "/" + m + "/" + y);
}

//-------------------------------
//
//-------------------------------
function isLeapYear (year) { 
  if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) return (true)
  else return (false)
}

//-------------------------------
//
//-------------------------------
function formatDateMonthYear(date) {
  if (date == "") return "";
  if (date.match(/^\d{4}$/) != null) return date;
  if (date.match(/^(\d{1,2})(\/?)(\d{0,4})$/)) return formatMonth(date);
  return formatDate(date);
}

//-------------------------------
// dateInFuture(date) 
// returns Boolean
//-------------------------------
function dateInFuture(date) {
  var curDate = new Date();
  if (curDate.valueOf() < convertDate(date, "utc")) return (true)
  return false;
}

//-------------------------------
//
//-------------------------------
function formatSSN(ssn) {
  if (ssn == "") return "";
  if (ssn.match(/^\d{9}$/)) return (ssn.substr(0,3) + "-" + ssn.substr(3,2) + "-" + ssn.substr(5,4));
  if (ssn.match(/^\d{3}-\d{2}-\d{4}$/)) return (ssn);
  if (ssn.match(/^[A-Za-z]{2}\d{6}$/)) return (ssn);
  if (ssn.match(/^[A-Za-z]{2}\d{7}$/)) return (ssn);
  if (ssn.match(/^[A-Za-z]{3}\d{6}$/)) return (ssn);
  return (-1)
}

//-------------------------------
//
//-------------------------------
function formatPhone(phone) {
  var e = match(phone,"[x]");
  var ext =  "";
  if (e >= 0) { ext=phone.substring(e+1,phone.length); phone=phone.substring(0,e) }
  if ((ext != "") && (match(ext,"\\d{1,5}")< 0)) return (-1);
  phone = phone.replace(eval("/[^A-Z0-9]/g"),"");
  var p = "ABCDEFGHIJKLMNOPRSTUVWXYQZ";
  var n = "234567890";
  for (var i=0; i<=8; i++) phone = phone.replace(eval("/[" + p.substring(i*3,i*3+3) + "]/g"), n.substring(i,i+1));
  if ((phone.length != 10) && (phone.length !=7 )) return (-1);
  if (phone.length == 10) phone = "(" + phone.substring(0,3) + ") " + phone.substring(3,6) + "-" + phone.substring(6,10)
  if (phone.length == 7) phone = phone.substring(0,3) + "-" + phone.substring(3,7);
  return (phone + (e>=0 ? " x" + ext : ""));
}

//-------------------------------
//
//-------------------------------
function formatZip(zip) {
  if (match(zip,"\\d{5}") >= 0) return (zip);
  if (match(zip,"\\d{5}[-]\\d{4}") >= 0) return (zip);
  if (match(zip,"\\d{9}") >= 0) return (zip.substring(0,5) + "-" + zip.substring(5,9));
  if (match(zip,"[A-Z]\\d[A-Z]\\s\\d[A-Z]\\d") >= 0) return (zip);
  if (match(zip,"[A-Z]\\d[A-Z]\\d[A-Z]\\d") >= 0) return (zip.substring(0,3) + " " + zip.substr(3,6));
  return (-1)
}

//-------------------------------
//
//-------------------------------
function match(text,pattern) {
  var r = text.match(pattern);
  if (r == null) return (-1)
  else return (r.index);
}

//-------------------------------
//
//-------------------------------
function convertTime(time, format) {
  /* time  : N-n | N+n  (N is now, n is a number of minutes)
             hhmm     (military)
             hh:mm    (military)
             hh:mmp
             utc
     format: utc  utc
             hm   hhmm
             12   hh:mmp
             24   hh:mm
  */
  if (time == "") return "";
  var h; var m;
  time = "" + time;
  if (time.match(/^[Nn][+-]{0,1}\d{0,}$/) != null) {
    var dateObj = new Date();
    var d = new Date(dateObj.valueOf() + (time.substr(1,10)*60000));
    h = d.getHours(); m = d.getMinutes();
  }
  else {
    if (time.match(/^\d{4}$/) != null) { h = time.substr(0,2) - 0; m = time.substr(2,2) - 0; }
    else {
      if (time.match(/^\d{2}:\d{2}$/) != null) { h = time.substr(0,2) - 0; m = time.substr(3,2) - 0; }
      else {
        if (time.match(/^\d{2}:\d{2}(a|p)$/i) != null) {
          var p = time.substr(5,1);
          h = time.substr(0,2) - 0; m = time.substr(3,2) - 0;
          if (p == "a" && h == 12) h = 0;
          if (p == "p" && h < 12) h = h + 12;
        }
        else { var dateObj = new Date(time-0); h = dateObj.getHours(); m = dateObj.getMinutes(); }
      }
    }
  }
  switch (format) {
    case "hm":
      return "" + (h<10?"0"+h:h) + (m<10?"0"+m:m);
      break;
    case "h:m":
      if (app.timeFormat == 24) return "" + (h<10?"0"+h:h) + ":" + (m<10?"0"+m:m);
      else {
        var p = (h < 12 ? "a" : "p");
        if (h == 0) h = 12;
        if (h > 12) h = h - 12;
        return "" + (h<10?"0"+h:h) + ":" + (m<10?"0"+m:m) + p;
      }
      break;
    case "utc":
      var dateObj = new Date(1970, 0, 1, h, m);
      return dateObj.valueOf();
      break;
    default: return time;
  }
}

//-------------------------------
//
//-------------------------------
function convertDate(date, format) {
  /* date  : T-n | T+n (T is today, n is a number of days)
             mm/dd/yyyy if app.dateFormat == "mm/dd"
             dd/mm/yyyy if app.dateFormat == "dd/mm"
             yyyy-mm-dd
             utc
     format: utc    utc
             y-m-d  yyyy-mm-dd
             m/d/y  mm/dd/yyyy if app.dateFormat == "mm/dd"
                    dd/mm/yyyy if app.dateFormat == "dd/mm"
  */
  if (date == "") return "";
  date = "" + date;
  var y; var m; var d;
  if (date.match(/^[Tt][+-]{0,1}\d{0,}$/) != null) {
    var dateObj = new Date;
    var dt = new Date(dateObj.valueOf() + (date.substr(1,10)*86400000));
    y = dt.getFullYear();
    m = dt.getMonth()+1; if (m < 10) m = "0" + m;
    d = dt.getDate();    if (d < 10) d = "0" + d;
  }
  else {
    if (date.match(/\d{2}\/\d{2}\/\d{4}/) != null) {
      if (app.dateFormat == "mm/dd") { y = date.substr(6,4); m = date.substr(0,2); d = date.substr(3,2); }
      else { y = date.substr(6,4); m = date.substr(3,2); d = date.substr(0,2); }
    }
    else {
      if (date.match(/\d{4}-\d{2}-\d{2}/) != null) { y = date.substr(0,4); m = date.substr(5,2); d = date.substr(8,2); }
      else {
        var dateObj = new Date(date-0);
        y = dateObj.getFullYear();
        m = dateObj.getMonth()+1; if (m < 10) m = "0" + m;
        d = dateObj.getDate();    if (d < 10) d = "0" + d;
      }
    }
  }
  switch (format) {
    case "y-m-d":
      return y + "-" + m + "-" + d;
      break;
    case "m/d/y":
      if (app.dateFormat == "mm/dd") return m + "/" + d + "/" + y;
      else return d + "/" + m + "/" + y;
      break;
    case "utc":
      var dateObj = new Date(y-0, m-1, d-0);
      return dateObj.valueOf();
      break;
    default: return date;
  }
}
