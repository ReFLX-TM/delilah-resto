Pasos para configurar Base de Datos (Usarse con MySQL Workbench):
    - Crear una intancia de base de datos con nombre delilah_resto, host en localhost, usuario root y contraseña 1234 
    - En el caso de usar una configuracion diferente de base de datos, cambiar las variables en el archivo .env por los utilizados
    - Dirigirse a Navigator --> Administration --> Data Import/Restore
    - Seleccionar la carpeta databaseScripts como origen de Importación y cargar los scripts
    - Seleccionar Base de datos delilah_resto
    - Seleccionar Importar estructura y datos

    Notas: 
    - En el caso de no importar los datos tener en cuenta que luego se debe crear un usuario con rol "admin" y al menos un producto
    - Solo se admiten dos roles en el sistema: (admin y cliente)


Pasos para inicializar el servidor:
- Extraer el contenido del archivo "app"
- Iniciar la consola y utilizar el comando "npm i" para descargar las dependencias
- Para iniciar el servidor utilizar el comando "npm run start"

El swagger esta implementado para tener su respectiva interfaz, la ruta para acceder es "/api-docs"