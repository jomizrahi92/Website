<?php

$send_to = 'jomizrahi92@yahoo.com';

/* DO NOT EDIT ANYTHING ELSE UNLESS YOU KNOW WHAT YOU'RE DOING :) */

if (!defined('PHP_EOL')) define ('PHP_EOL', strtoupper(substr(PHP_OS,0,3) == 'WIN') ? "\r\n" : "\n");

if (!function_exists('is_email')) {
	function is_email( $email ) {
		
		if ( strlen( $email ) < 3 ) return false;
		if ( strpos( $email, '@', 1 ) === false ) return false;

		// Split out the local and domain parts
		list( $local, $domain ) = explode( '@', $email, 2 );
		
		if ( !preg_match( '/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/', $local ) ) return false;
		if ( preg_match( '/\.{2,}/', $domain ) ) return false;
		if ( trim( $domain, " \t\n\r\0\x0B." ) !== $domain ) return false;

		// Split the domain into subs
		$subs = explode( '.', $domain );

		// Assume the domain will have at least two subs
		if ( 2 > count( $subs ) ) return false;

		// Loop through each sub
		foreach ( $subs as $sub ) {
			// Test for leading and trailing hyphens and whitespace
			if ( trim( $sub, " \t\n\r\0\x0B-" ) !== $sub ) return false;
			
			// Test for invalid characters
			if ( !preg_match('/^[a-z0-9-]+$/i', $sub ) ) return false;
		}
		return true;
	}
}

/* Contact Form Processing */

$error = '';

if (isset($_POST['name'])) $name = stripslashes(trim($_POST['name'])); else $name = '';
if (isset($_POST['email'])) $email = stripslashes(trim($_POST['email'])); else $email = '';
if (isset($_POST['message'])) $message = stripslashes(trim($_POST['message'])); else $message = '';
if (isset($_POST['honeypot'])) $honeypot = stripslashes(trim($_POST['honeypot'])); else $honeypot = '';

if (!$name) :
	echo 'Error: Name is required.';
	exit;
elseif (!$email) :
	echo 'Error: Email is required.';
	exit;
elseif (!$message) :
	echo 'Error: Message is required.';
	exit;
elseif ($honeypot) :
	echo 'Error: You entered something in the Spam Trap...';
	exit;
elseif (!is_email($email)) :
	echo 'Error: Invalid email address.';
	exit;
endif;

$subject = 'Contact from ' . $name;

$headers = 'From: '.$email.'' . PHP_EOL . 'Reply-To: '.$email.'';

$content = 'You have been contacted by '.$name.'. They wrote the following:' . PHP_EOL . PHP_EOL . $message;
$content = wordwrap($content, 70);

if (!mail( $send_to, $subject, $content, $headers )) :
	echo 'Mail could not be sent. Please check your server configuration.';
	exit;
else :
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		echo 'SUCCESS';
	} else {
		echo 'Email sent successfully.';
	}
endif;