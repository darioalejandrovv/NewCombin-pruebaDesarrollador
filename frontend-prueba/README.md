# Aplicación de prueba

Este es el frontend de la prueba. Se desarrolla en ReactJs, se utilizan las librerías de Material UI para proveer de los componentes y el contepto de diseño basado en material design de Google. 
Se estructura la interfaz mediante componentes, se cuenta con un diseño responsivo y cumple con la mayoría de las  especificaciones del reto. 
Al iniciar la aplicación se verifica que el Token almacenado preliminarmente en el locastorage sea aún vigente, en caso contrario se cierra la sesión que pudiese estar activa. Se implementa toda la lógica de autenticación en el frontend.
Debido a consideracioens de seguridad contempladas en la construcción de un backend, se realizan pruebas mediante las credenciales:
email:      sarah@connor.com
password:   connorconnor

Para el presente reto se plantea implementar como propuesta un backend en NodeJs, Typescript, con Loopback de IBM como framework, una arquitectura DDD, escalable y basado en puntos de conexiones Restfull API's construidas bajo el estandar de la OPEN-API, en un API, documentada.
Las contraseñas en la base de datos estática se encuentran cifradas 10 veces. 
Por parte del framework se cuenta con conectores a distintas bases de datos relacionales y no relaciones a donde exportar los modelos-entidades construidas, se cuenta con capa de repositorios, servicios y controladores.  
Se implementa una estrategia de control de acceso basado en roles (RBAC) estandar de codigo abierto y se implementa una estrategia de autorización con token generado (JWT).


### Ejecutar Frontend
Ejecute `npm install`
Ejecute `npm start`
La aplicación frontend se ejecuta en  [http://localhost:3000]

#### Ejecutar Backend

Ejecute `npm install`
Ejecute `npm start`
La aplicación frontend se ejecuta en  [http://localhost:8081]
