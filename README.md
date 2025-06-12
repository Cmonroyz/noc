## introduccion

Aplicacion NOC ( Network Operation Center), voy a hacer esta aplicacion utilizando Node y typescript, y utilizare como dependencias de desarrollo ts-node-dev
el script inicial esta copiado desde [typescript help](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b).

Se va a utilizar Arquitectura limpia
Utilizare el paquete de [cron](https://www.npmjs.com/package/cron)

## Instalacion
1. clona el repositorio
2. cambia el .env.dit a .env y configura tus variables.
3. instala poryecto ``` npm install ```

## variables
Las variables de entorno utilizamos el paquete [dotenv](https://www.npmjs.com/package/dotenv)
Tambien para poder hacer validaciones del mismo utilizamos el paquete de [env-var](https://www.npmjs.com/package/env-var)

se realizo el tipado de las variables en env.plugin, y puedo subir el nombre de las variables con un .env.dist o .env.template