var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

    if (name == null || name == "" || email == null || email == "" || message == null || message == "")  {
        res.send("Error: Missing fields.");

        return;
    }

    var sendgrid  = require('sendgrid')('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');

    sendgrid.send({
        to:       'jomizrahi92@yahoo.com',
        from:     'contact-form@josephmizrahi.com',
        fromname: name,
        replyto:  email,
        subject:  'Website contact from ' + name,
        text:     message
    }, function(err, json) {
        if (err) {
            res.send('Error!');

            return;
        }

        res.send('SUCCESS');

        console.log(json);
    });
});

module.exports = router;
