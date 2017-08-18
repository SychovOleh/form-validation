function ds(serializedString) {
	var resultObject = {};
	serializedString.replace(/<(.+?)>/g, function(matchedString, bracketCotents) {
		var values = bracketCotents.split(",");
		if (!resultObject[values[0]]) {
			// Use first value as key for object
			resultObject[values[0]] = values;
		}
	});
	return resultObject;
}

console.log(ds("<anya,90,60,90><lena,92,65,87><nona,88,62,90>"));