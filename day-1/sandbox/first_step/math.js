//maths.js
function add(a, b){
	return a + b;
}
function diff(a, b){
	return a - b;
}
function prod(a, b){
	return a*b;
}
function quot(a, b){
	if(b===0){
		return "Division par zero impossible";
	}
	return a/b;
}
module.exports = { add, diff, prod, quot };
