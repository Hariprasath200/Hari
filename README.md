I have uploaded the Execution Video as a compressed .zip file to comply with GitHub's file size limitations.
If you have any queries or require clarification regarding the project's functionality, please feel free to refer to the video for detailed execution.

Tech User:
Backend = Django,Django RestFramework, JWT
Frontend = React,TailwindCss,Html5
Database = Mysql

Instruction to Run The project :
Important : Create Database name (task) in mysql 

Backend:
Step-1 : Download and Open project in Vs Code 
Step-2 : In Vs code Open terminal for both frontend and backend ,like a 2 pages in terminal or split as a 2 terminal.
Step-3 : Both Termianl make to Cmd
Step-4 : Now type (cd backend) , then it will entered into the backend folder like a django project 
Step-5 : Now type ( conda create -n task python==3.13) , it will create env for project, once created then activate it using ( conda activate task).
Step-6 : Now type ( pip install -r requirements.txt) , it will install all necessary packages for this project.
Step-7 : Now type ( python manage.py makemigrations) , then ( python manage.py migrate)
Step-8 : Finally run Backend using cmd  ( python manage.py runserver)

Frontend:

Step-1 : In another Terminal type (cd frontend) , it will entered into the frontend folder like a React Folder.S
Step-2 : Type (cmd) , then type ( npm install ) for node modules
Step-3 : Type ( npm install axios, npm install react-router-dom, npm install react-toastify,npm install 'js-cookie' )
Step-4 : Finally Run Frontend using cmd ( npm run dev )


For Backend Comments to run Project:

cd backend
conda create -n task python=3.11
conda activate task
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

For Frontend Comments to run Project

cd frontend
npm install
npm install axios
npm install react-router-dom
npm install react-toastify
npm install 'js-cookie'
npm run dev 

""" After running both frontend and backend , Copy frontend Localhost path and paste into the chrome.
