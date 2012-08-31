var OYW = OYW || {};
OYW.Utils = OYW.Utils || {};

// Utility function to convert String date to YYYY-MM-DD format
OYW.Utils=(function(){

	var dateToYMD=function(date){
		var d = date.getDate();
		var m = date.getMonth()+1;
		var y = date.getFullYear();
		return '' + y +'-'+ (m<=9?'0'+m:m) +'-'+ (d<=9?'0'+d:d);
	};

	return {
		dateToYMD:dateToYMD
	}

}());