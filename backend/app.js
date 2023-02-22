var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pushdataRouter = require("./routes/pushdata");
var updatedataRouter = require("./routes/updatedata");
var authenticateRouter = require("./routes/authenticate");
var userinfoRouter = require("./routes/userinfo");
var otheruserinfoRouter = require("./routes/otheruserinfo");
var removeRouter = require("./routes/remove");
var removeSavedPostbyId = require("./routes/removeSavedPostbyId");
var createSubGredditRouter = require("./routes/createsubgreddit");
var getUserSubGredditRouter = require("./routes/getUserSubGredditInfo");
var getAllSubGredditRouter = require("./routes/getAllSubGredditInfo");
var getJoinedSubgreddits = require("./routes/getJoinedSubgreddits");
var getSubGredditInfobyIDRouter = require("./routes/getsubgredditbyid");
var getPosts = require("./routes/getPosts.js");
var getPostsbyId = require("./routes/getPostsbyId.js");
var getPostsbyPostedIn = require("./routes/getPostsbyPostedIn.js");
var createPost = require("./routes/createpost.js");
var followUser = require("./routes/followUser.js");
var savePost = require("./routes/savePost.js");
var joinSubgreddit = require("./routes/joinSubgreddit.js");
var requestSubgreddit = require("./routes/requestSubGreddit.js");
var rejectUser = require("./routes/rejectUser.js");
var leaveSubgreddit = require("./routes/leavesubgreddit.js");
var addComments = require("./routes/addComments.js");
var reportPost = require("./routes/reportPost.js");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pushdata', pushdataRouter);
app.use('/updatedata', updatedataRouter);
app.use('/auth', authenticateRouter);
app.use('/userinfo', userinfoRouter);
app.use('/otheruserinfo', otheruserinfoRouter);
app.use('/remove', removeRouter);
app.use('/removesavedpostbyid', removeSavedPostbyId);
app.use('/createsubgreddit', createSubGredditRouter);
app.use('/getusersubgreddit', getUserSubGredditRouter);
app.use('/getallsubgreddit', getAllSubGredditRouter);
app.use('/getjoinedsubgreddits', getJoinedSubgreddits);
app.use('/getsubgredditbyid', getSubGredditInfobyIDRouter);
app.use('/getposts', getPosts);
app.use('/getpostsbyid', getPostsbyId );
app.use('/getpostsbypostedin', getPostsbyPostedIn);
app.use('/createpost', createPost);
app.use('/followUser', followUser);
app.use('/savepost', savePost);
app.use('/joinsubgreddit', joinSubgreddit);
app.use('/requestsubgreddit', requestSubgreddit);
app.use('/rejectuser', rejectUser);
app.use('/leavesubgreddit', leaveSubgreddit);
app.use('/addcomments', addComments);
app.use('/reportpost', reportPost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
