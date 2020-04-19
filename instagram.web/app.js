/* importar as configurações do servidor */
var app = require('./config/server');
app.listen(80, function () {
	console.log('Server On');
})