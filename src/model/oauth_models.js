"use strict";

var connection = require('./mongoose_connection');
var mongoose = require('mongoose');


var OAuthAccessTokensSchema = new mongoose.Schema({
    accessToken: String,
    clientId: String,
    userId: String,
    expires: Date
});

var OAuthRefreshTokensSchema = new mongoose.Schema({
    refreshToken: String,
    clientId: String,
    userId: String,
    expires: Date
});

var OAuthClientsSchema = new mongoose.Schema({
    clientId: String,
    clientSecret: String,
    redirectUri: String
});

var OAuthUsersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: '' }
});

module.exports = { };

module.exports.AccessToken = connection.model('OAuthAccessTokens', OAuthAccessTokensSchema);
module.exports.RefreshToken = connection.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
module.exports.Client = connection.model('OAuthClients', OAuthClientsSchema);
module.exports.User = connection.model('Users', OAuthUsersSchema);
