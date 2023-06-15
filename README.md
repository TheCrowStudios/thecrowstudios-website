# thecrowstudios-website
The server and main page for TheCrowStudios website.

The websites hosted as subdomains by the server can be found at
https://github.com/TheCrowStudios/file-dump
https://github.com/TheCrowStudios/gun-crow-website

# Running on Linux
Running this on Linux took a long time to get it working for me because of all the issues I was running in to, about 2 days. To be honest I should've developed on Linux in the first place probably, but hey I learned something.
Clone the repositories into a directory
```
mkdir website
cd website/
git clone https://github.com/TheCrowStudios/thecrowstudios-website
git clone https://github.com/TheCrowStudios/file-dump
git clone https://github.com/TheCrowStudios/gun-crow-website
```

Install packages in each directory using
```
npm install
```

Set up the .env with the correct settings
```
mv env .env
vim .env
```

Run the server with Node
```
cd thecrowstudios-website
sudo node server.js
```

Server logs are outputted to log.txt and log_verbose.txt files.

File Dump uses `mysql2` package, which for some reason gives a syntax error on Linux when using it, which looks like it's one of the dependencies causing this. To fix this you need to use the `mysql` package and then change the authentication settings in the database as `mysql2` package does not support the default one.

You can use this command
```
ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY password;
```
Where `root` is the user, `localhost` is the URL and `password` is the password for the user.

If you get `mysql2` to work then you will not have to do this.

If you find any issues please let me know.
Thanks for checking this out!