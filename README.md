# simple-registration
This project is about simply registration using Python Django framework  in the back end side and React js in the front end side

# Setup Backend
First please install virtual environment python, and then move into folder server and install all the dependencies package in file requirement.txt using command 
> pip install -r requirement.txt

After all package dependencies got installed then you can setup database in the file settings.py. In my case i'm using postgreSQL, this is my default setting for database

> DATABASES = {  
    'default': {  
        'ENGINE': 'django.db.backends.postgresql_psycopg2',  
  'NAME': 'mitrais',  
  'HOST': 'localhost',  
  'PORT': '5432',  
  'USER': 'postgres',  
  'PASSWORD': 'postgres',  
  }  
}

after that you can try to run makemigrations and migrate 
> python manage.py makemigrations
> python manage.py migrate

Finally you can try to run server using runserver
>python manage.py runserver

Then you can cek in the localhost:8000 . In my case i'm using port 8000.

# Setup Frontend Side
For frontend side you can move into folder client-side. And then you can install all node_modules package dependencies react js using npm or yarn. In my case i'm using yarn, you can try this command in folder client-side that consist of file package.json.
> yarn

Or you can use npm install
>npm install

After all the node_modules got installed, if you change the port of backend not using 8000, you must change the api URL in the file Register.js and Login.js in the client-side/src/components/actions. If you're not changing the port you can try to run the code using command 

>yarn start or npm start
