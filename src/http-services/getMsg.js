exports.onGet = function(response, query){
	var result = {};
	if(query){
		result.ok = true;
		result.data = query;
	}else{
		result.ok = false;
		result.data = "没有回复数据!";
	}
	
	result = JSON.stringify(result);
	
	response.writeHead(200, {
		'Content-Length': Buffer.byteLength(result),
		'Content-Type': 'text/plain; charset=utf-8'
	});
	response.end(result);
}