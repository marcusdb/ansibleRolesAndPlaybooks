var mailin = require('mailin');
var http = require('https');

/* Start the Mailin server. The available options are:
 *  options = {
 *     port: 25,
 *     webhook: 'http://mydomain.com/mailin/incoming,
 *     disableWebhook: false,
 *     logFile: '/some/local/path',
 *     logLevel: 'warn', // One of silly, info, debug, warn, error
 *     smtpOptions: { // Set of options directly passed to simplesmtp.createServer(smtpOptions)
 *        SMTPBanner: 'Hi from a custom Mailin instance'
 *     }
 *  };
 * Here disable the webhook posting so that you can do what you want with the
 * parsed message. */
mailin.start({
    port: 2500,
    disableWebhook: true // Disable the webhook posting.
});



/* Event emitted after a message was received and parsed. */
mailin.on('message', function (connection, data, content) {
    var slackMessage = { channel: "#alerta", username: "MONIT", icon_emoji: ":no_entry_sign:",text:data.html };
    PostCode(slackMessage);
    /* Do something useful with the parsed message here.
     * Use parsed message `data` directly or use raw message `content`. */
});

function PostCode(post_data) {
    //console.log(post_data);
    // Build the post string from an object

    // An object of options to indicate where to post to
    var post_options = {
        host: 'hooks.slack.com',
        path: '/services/T046ENNFZ/B21JB8TDY/cIlUzgIdZqz2QSD1HOSus7cm',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}
