function replaceStringOccurances(srcString, stringToReplace, replaceWith) {
	var escapedString,
		reg;

	escapedString = stringToReplace.replace(/[\(\)\[\]\\\.\^\$\|\?\+\*\{\}]/g, '\\$&');
	reg = new RegExp(escapedString, 'g');
	return srcString.replace(reg, replaceWith);
}