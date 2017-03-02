var restify = require('restify');
var fs = require('fs');
var nodemailer = require('nodemailer');
//var sendmail = require('sendmail');
//var helper = require('sendgrid').mail;
var PATH = '/static/schedule-corticella';
var MPATH = '/messages';
//var obj = $.parseJSON( '{ "name": "John" }' );
 var shifts = [

    {
        date: "2017-03-04T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-04-01T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-05-20T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-06-10T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-06-11T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-07-08T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-07-29T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-07-30T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-08-26T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-09-16T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-09-17T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-10-14T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-11-04T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-11-5T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-12-02T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-12-23T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-12-24T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-04-17T00:00:00",
        turni: "Siamo aperti dalle 8.30 alle 24.00"
    },
    {
        date: "2017-04-18T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-19T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-20T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-21T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-22T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-23T00:00:00",
        turni: "Apertura continuata 24 ore"
    },
    {
        date: "2017-04-24T00:00:00",
        turni: "Apertura continuata fino alle 12.30 e dalle 15.30 alle 19.30"
    },
    {
        date: "2017-02-11T01:00:00",
        turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"
    }
 ];

// var shifts = require('./turni.json');
var msg = [
        { id: "1000", firstName: "", lastName: "", emailAddress: "", subject: "", message: ""},
    ];

var currentIdCount = msg.length;

// function getProducts(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("GET[" + PATH + "] " + JSON.stringify(products));
// 	res.send(200, products);
// 	next();
// };
function getShifts(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.send(200, shifts);
	next();
};
function getMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("GET[" + MPATH + "] " + JSON.stringify(msg));
	res.send(200, msg);
	next();
};



function addMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','http://207.154.202.235');
	console.log("POST[" + MPATH + "] " + JSON.stringify(req.body));

	currentIdCount = currentIdCount + 1;
	var msgId = currentIdCount * 1000;
	req.body.id = msgId.toString();

	msg.push(req.body);
	writeMsg('static/contacts.json', JSON.stringify(msg));
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maildev43@gmail.com',
            pass: 'matilde95'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Webmaster farmacia di Corticella" <maildev43@gmail.com>', // sender address
        to: 'claudio.tubertini@gmail.com', // list of receivers
        subject: JSON.stringify(req.body.subject) +' from ' + JSON.stringify(req.body.emailAddress),
        text:  JSON.stringify(req.body.message)
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
	res.send(200, msgId);

	return next();
};

function testmail(req, res){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maildev43@gmail.com',
            pass: 'matilde95'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Webmaster farmacia di Corticella" <maildev43@gmail.com>', // sender address
        to: 'claudio.tubertini@gmail.com', // list of receivers
        subject: JSON.stringify(req.body.subject) +' from ' + JSON.stringify(req.body.emailAddress),
        text:  JSON.stringify(req.body.message)
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    return next();
};
function writeMsg(file, string ){
    jsonstring = JSON.stringify(string);
	fs.writeFile(file, jsonstring, function(err) {
	    if(err){
        return console.log(err);}

	    console.log("The file was saved!");
	});
};
writeMsg("static/turni.json", shifts);

// $.ajax({
//     url: 'http://www.agi.it/salute/rss',
//     dataType: 'xml',
//     async: true,
//     cache:false,
//     success: function(data) {

//         var entries = JSON.stringify(data);

//         fs.writeFile("static/news.json", entries, function(err) {
//             if(err){
//                 return console.log(err);}
//             console.log("The news file was saved!");
//             });
//         },
//     error: function(){
//             alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
//         }
//     });

// feednami.setPublicApiKey('c37e2b609bc2333452742fb05f11f5ec52c86c2275b2f64b2ecf94a00fd2ec65')
//   var url = 'http://www.agi.it/salute/rss'
//   feednami.load(url,function(result){
//     if(result.error){
//       console.log(result.error)
//     }
//     else{
//       var entries = JSON.stringify(result.feed.entries);
//     }
//     fs.writeFile("static/news.json", entries, function(err) {
//         if(err){
//         return console.log(err);}

//         console.log("The news file was saved!");
//     });
//   });


// function updateProduct(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("PUT[" + PATH + "] " + JSON.stringify(req.body));

// 	products.forEach(function(product, index) {
// 		if(req.body.id == product.id) {
// 			product.name = req.body.name;
// 			product.description = req.body.description;
// 			product.price = req.body.price;
// 		}
// 	});

// 	res.send(200);
// 	next();
// };

// function deleteProduct(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("DELETE[" + PATH + "/" + req.params.id + "]");

// 	products.forEach(function(product, index) {
// 		if(req.params.id == product.id) {
// 			products.splice(index, 1);
// 		}
// 	});
// 	res.send(200, req.params.id);
// 	next();
// };


var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));
//restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.CORS({
    origins: ['http://207.154.202.235', 'http://localhost:8081'],
    credentials: true,
    headers: ['x-foo']
     }));
server.use(restify.jsonp());

// server.use(
//   function crossOrigin(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     return next();
//   }
// );
server.get(/\/((?!static).)*\/?/, restify.serveStatic({
  directory: './static',
  default: 'index.html'
}));
server.get(PATH, getShifts);
// server.put(PATH, updateProduct);
server.get(MPATH, getMessage);
server.post(MPATH, addMessage);
// server.del(PATH +'/:id', deleteProduct);

server.listen(8081, '127.0.0.1',function() {
	console.log('%s listening at %s', server.name, server.url);
});