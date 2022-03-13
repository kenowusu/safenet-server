## Main Features
 - **Security**, passwords are encrypted with complex AES algorith
 -  Improved password **folders**(categories)
 -  **Import** Password(From Google and another web)(**One-click password            import**) 
 -  **Share** password through email
 -  **Accessible**(Chrome extension, console)
 -  **Generate** strong passwords
 -  Dark web monitoring


## About 
Rottpass is a password manager built with **NextJS** and **Express**. Unlike other password managers(limited to web and browser extensions), rottpass has a **console client(app)** where bash commands can be issued to get access and manipulate passwords. As developers work in the console most  of the time, it would be a hardwork going to copy and paste your passwords from your browser or desktop app whenever you need a password, hence **rottpass**.

## Why this project
- Challenge myself to build **one(1) api**(NodeJS backend) for multiple clients (nextjs,chrome extension,console)
- Get a password manager that can be customized to suit my needs and be accessed in the console.

## Technologies Used 
- *Node / Express*
- *Sequelize / MySQL  / Sequelize Migrations(Database)*
- *JWT  / Cookies for authentication(pure JWT, no authentication library)*
- *Multer for file upload*
- *VPS / Bash / Nginx (Apps are hosted on different vps on digital ocean using ngix reverse proxy)*
- *NodeJS Streams - Piping error logs and reading csv files*


## How To Use
``` bash
#clone repo
git clone https://github.com/kenpl44/rottpass.git
cd rottpass
npm i

#check .env.example and add your necessary envs
mv .env.example .env

#create db and table schemas
npx sequelize-cli db:create
npx sequelize db:migrate

#start app
npm start
```



## Currently Learning
- React design patterns(linkedIn learning)
- Testing

