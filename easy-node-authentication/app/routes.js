module.exports = function(app, passport, request) {

    // normal routes ===============================================================
    
        // show the home page (will also have our login links)
        app.get('/', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        app.get('/home', function(req, res) {
            res.render('index.ejs');
        });
    
        app.get('/reg', function(req, res) {
            res.render('enroll.ejs');
        });

        

        //adoption
        app.get('/adopt', function(req, res){
            res.render('adopt.ejs');
        });

        // PROFILE SECTION =========================
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user
            });
        });

        //payment
        app.get('/pay', function(req, res) {  
            res.render('pay.ejs');
        });
    
        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        app.get('/board', function(req, res) {
            res.render('board.ejs');
        });

        app.get('/column', function(req, res) {
            res.render('column.ejs');
        });
    
    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================
    
        // locally --------------------------------
            // LOGIN ===============================
            // show the login form
            app.get('/login', function(req, res) {
                res.render('login.ejs', { message: req.flash('loginMessage') });
            });
    
            // process the login form
            app.post('/login', passport.authenticate('local-login', {
                successRedirect : '/home', // redirect to the secure profile section
                failureRedirect : '/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));
    
            // SIGNUP =================================
            // show the signup form
            app.get('/signup', function(req, res) {
                res.render('signup.ejs', { message: req.flash('signupMessage') });
            });
    
            // process the signup form
            app.post('/signup', passport.authenticate('local-signup', {
                successRedirect : '/login', // redirect to the secure login section
                failureRedirect : '/signup', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));
    
        // facebook -------------------------------
    
            // send to facebook to do the authentication
            app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
    
            // handle the callback after facebook has authenticated the user
            app.get('/auth/facebook/callback',
                passport.authenticate('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
        // twitter --------------------------------
    
            // send to twitter to do the authentication
            app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
    
            // handle the callback after twitter has authenticated the user
            app.get('/auth/twitter/callback',
                passport.authenticate('twitter', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
    
        // google ---------------------------------
    
            // send to google to do the authentication
            app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
            // the callback after google has authenticated the user
            app.get('/auth/google/callback',
                passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    
        // locally --------------------------------
            app.get('/connect/local', function(req, res) {
                res.render('connect-local.ejs', { message: req.flash('loginMessage') });
            });
            app.post('/connect/local', passport.authenticate('local-signup', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));
    
        // facebook -------------------------------
    
            // send to facebook to do the authentication
            app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));
    
            // handle the callback after facebook has authorized the user
            app.get('/connect/facebook/callback',
                passport.authorize('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
        // twitter --------------------------------
    
            // send to twitter to do the authentication
            app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
    
            // handle the callback after twitter has authorized the user
            app.get('/connect/twitter/callback',
                passport.authorize('twitter', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
    
        // google ---------------------------------
    
            // send to google to do the authentication
            app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
    
            // the callback after google has authorized the user
            app.get('/connect/google/callback',
                passport.authorize('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));
    
    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future
    
        // local -----------------------------------
        app.get('/unlink/local', isLoggedIn, function(req, res) {
            var user            = req.user;
            user.local.email    = undefined;
            user.local.password = undefined;
            user.local.address = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });
    
        // facebook -------------------------------
        app.get('/unlink/facebook', isLoggedIn, function(req, res) {
            var user            = req.user;
            user.facebook.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });
    
        // twitter --------------------------------
        app.get('/unlink/twitter', isLoggedIn, function(req, res) {
            var user           = req.user;
            user.twitter.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });
    
        // google ---------------------------------
        app.get('/unlink/google', isLoggedIn, function(req, res) {
            var user          = req.user;
            user.google.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

        /* chat 기능 추가 */
        /* Get 방식으로 / 경로에 접속하면 실행 됨 */
        app.get('/chat', function(req, res) {
            res.render('chat.ejs', function(err, data) {;
                if(err) {
                    res.send('에러')
                } else {
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.write(data)
                    res.end()
                }
            })
        })

// pay 시작
let address
app.get('/api/get_history', async function(req, res) {

  let options = {
    uri: "http://api-ropsten.etherscan.io/api",
    qs: {
      module: "account",
      action: "txlist",
      address: '0xB08f34f896698cC5B4102cB331bad0969E545bEC',
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apikey: 'NMV9146IBPRYRJVAYAJ3K7H7K7K8GGYBV1'
    }
  }

  request(options, (error, response, result) => {
    if(error) {
      console.log(error);
    } else {
      res.json(JSON.parse(result))
    }
  })
})

app.post('/api/add_token', async function(req, res) {
    var contract_Address = req.param('0xbbf289d846208c16edc8474705c748aff07732db');
    token_list.push(contract_Address)
  })
// pay 종료

};

    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
    
        res.redirect('/');
    }