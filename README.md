# Copy.Messenger
Es un chat a tiempo real que utiliza webSockets y peticiones HTTP

## Front-end
Esta hecho con el framework de Angular, se usaron modulos como ngx-socket-io y HttpClient para realizar las peticiones/conexiones con el Back-end (Api_Rest)

## Back-end
Esta hecho con nodeJS se creó con sintaxis de typescript, se usaron los modulos; socket.io para hacer la conexion webSocket con el Front-end y http con express para las peticiones

### Ejecutar proyecto

- Database mysql

```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
```
En caso de que no funcione, copie lo que se encuentra del archivo db.sql y inserte en interfaz de mysql de su preferencia

- Back-end (Api_Rest)

```
cd Back
npm i
npm run dev
```

- Front-end 

```
cd Front
npm i
ng serve -o
```

Y listo el proyecto se ejecutara en http://localhost:4200/sign