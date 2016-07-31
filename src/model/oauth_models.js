"use strict";

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
    fullname: String,
    password: String,
    email: { type: String, default: '' },
    avatar: { contentType: String, data: Buffer},
    isSuperuser: Boolean
});

module.exports = { };

module.exports.AccessToken = mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
module.exports.RefreshToken = mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
module.exports.Client = mongoose.model('OAuthClients', OAuthClientsSchema);
module.exports.User = mongoose.model('Users', OAuthUsersSchema);
