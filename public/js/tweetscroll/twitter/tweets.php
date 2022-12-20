<?php

session_start();
require_once("twitteroauth.php"); //Path to twitteroauth library

$twitteruser = $_GET['username'];
$notweets = $_GET['limit'];
$consumerkey = "qu2I2VHCZjhB4wAzZ8XQZEG24";
$consumersecret = "Rk2DZKXR0i0MBC3z1VpMuLvDXgbxaLfHitsuRNedDEXt0mOAqV";
$accesstoken = "201535195-mczHTEiKH2QNKJgH1tC3A9SocipCej89Flw94OtE";
$accesstokensecret = "mODXNgxOrIP1e0Htmr7xyUuIGmcUfD8BYxPcCyUU0cR7D";

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
    $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
    return $connection;
}

$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

// if username isn't array check if user separated usernames with comma
if (!is_array($twitteruser))
    $twitteruser = explode(',', trim($twitteruser));

if (count($twitteruser) > 1) {
    
    $all_tweets = array();
    $remainder = $notweets % count($twitteruser);
    $tweets_per_user = floor($notweets / count($twitteruser));    
    
    // split tweets per user so it doesn't exceed limit
    foreach ($twitteruser as $user) {
        if ($remainder > 0) {
            $notweets = $tweets_per_user + $remainder;
        } else {
            $notweets = $tweets_per_user;
        }

        // get tweets
        $tweets[] = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" . $user . "&count=" . $notweets);
    }
    
    // merge into one array
    $all_tweets = $tweets[0];
    for ($i = 1; $i < count($tweets); $i++) {
        $all_tweets = array_merge($all_tweets, $tweets[$i]);
    }
} else {
    $all_tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" . $twitteruser[0] . "&count=" . $notweets);
}


header('content-type: application/json');
echo json_encode($all_tweets);
exit();
?>