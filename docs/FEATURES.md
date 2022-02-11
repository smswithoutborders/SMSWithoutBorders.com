# Features

This document contains all working features.

## Sign Up

Register for an SMSWithoutBorders account by filling the form on the [signup](http://localhost:18000/sign-up) page. This is a two step process involving two factor (2fa) authentication of the phone number provided. On successfull submission, you will be redirected to the [verification page](http://localhost:18000/sign-up/verify) to provide the authentication code. Once verified, your account will be created.

![signup](images/signup.png)

## Login

[Login](http://localhost:18000/login) to access your account using the credentials created at signup.

![login](images/login.png)

## Token storage

Authenticated users can access the [wallet page](http://localhost:18000/dashboard/wallet) to save tokens for all supported platforms(Gmail, Twitter and Telegram). Each platform's token can be saved by clicking the save button under its description

![wallet](images/wallet.png)

When saving tokens for Gmail and Twitter, an authorization screen will be displayed prompting you to grant the requested permissions.

![wallet](images/gmail_authorization.png)  ![wallet](images/twitter_authorization.png)

Saving Telegram access requires a phone number to be provided. A verification code will be sent which you have to provide to confirm. If you do not already have a Telegram account you will be prompted to create one.

![Telegram](images/telegram.png);

## Token Revoke

Authenticated users can delete stored tokens by selecting the revoke button under saved platform's details.

![Token revoke](images/token-revoke.png);

## Password Change

Authenticated users can change their current password from [settings](http://localhost:18000/dashboard/settings/change-password)

![Password change](images/password-change.png);

## Password Recovery

Users who have forgotten their account password can recover it by clicking the forgot password link on the [login page](http://localhost:18000/login). The phone number associated with the account is to be provided to which an authentication code will be sent for verification.

![Password Recovery Step 1](images/password-recovery-step-1.png);

After the code is successfully verified, the user will be able to set a new password

![Password Recovery Step 2](images/password-recovery-step-2.png);

After setting a new password, The user can resume using their account

![Password Recovery Step 3](images/password-recovery-step-3.png);

## Account Deletion

Authenticated users can delete their accounts from the [settings page](http://localhost:18000/dashboard/settings) under the [account deletion tab](http://localhost:18000/dashboard/settings/delete-account)

![Account Deletion](images/account-deletion.png);
