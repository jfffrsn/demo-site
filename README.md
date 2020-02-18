# echo360cast

##Getting Started


### 1. Make sure nodejs and npm are installed:
In GitBash or the command prompt type:

    node -v



This should return you the version number. If you get an error then you will need to install nodejs. Click the big button here: https://nodejs.org/. That will install both node and npm.
 

###2. Make sure GIT is installed:

    git --version

This should return you the version number. If you get an error then you will need to install GIT.
 http://git-scm.com/ 
 Windows users:  http://git-scm.com/download/win

### 3. Install bower globally:

Bower requires Node and npm and Git.

    npm install -g bower

### 4. Install gulp globally:

    npm install --global gulp


### 5. Install the project files:
In GitBash navigate the project folder and enter:

    npm install

that will create a new **node_modules** folder.  this contains the dependencies.
do not check this into version control.

next load the bower packages.

    bower install
that  will  create a new **bower_components** folder. this contains the packages.
do not check this into version control.

###6. Run Gulp
I have all tasks wrapped into the default task so in GitBash type:

    gulp
To stop this  task from running type CTRL-C.
