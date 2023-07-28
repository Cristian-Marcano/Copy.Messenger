# Copy.Messenger
Es un chat a tiempo real que utiliza webSockets y peticiones HTTP

## Front-end
Esta hecho con el framework de Angular utilizando angular-cli, se usaron modulos como ngx-socket-io y HttpClient para realizar las peticiones con el Back-end (Api_Rest)

## Back-end
Esta hecho con nodeJS se creo con sintaxis de typescript, se usaron el modulo socket.io para hacer la conexion webSocket con el Front-end y http y express para las peticiones

### Ejecutar proyecto

-Database mysql

```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
```
En caso de que no funcione, copie el lo que se encuentra del archivo db.sql y inserte en interfaz de mysql de preferencia

-Back-end (Api_Rest)

```
npm i
npm run dev
```

-Front-end 

```
npm i
ng serve -o
```

Y listo el proyecto se ejecutara en http:localhost:4200/sign