FROM node:16

# Crea el directorio de trabajo de la aplicación y establece como directorio de trabajo
WORKDIR /scripts

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Establece el comando para iniciar la aplicación
CMD ["npm", "run", "start"]
