1- prerequis :

creation d'un environnement.ts


# export const environment = {
#  production: true,
# apiUrl: 'http://180.149.196.17/fidalli'
# };


# ng build --configuration production

depot github

2 - connexion au server VPS avec ssh

# source /opt/myproject/bin/activate  
# cd /opt/myproject

  glonage du projet angular

3- Configurer Nginx

sudo nano /etc/nginx/sites-available/futuallies
sudo ln -s /etc/nginx/sites-available/futuallies /etc/nginx/sites-enabled/

server {
    listen 80;
    server_name 180.149.196.17 futurallies.com www.futurallies.com;

    access_log /var/log/nginx/futur-allies.log;


    root /opt/myproject/myproject/App_FutturAllies/Front-futurallies/dist/recrutement-intelligent/browser;
    index index.html;

    location /static/ {
        alias /opt/myproject/myproject/App_FutturAllies/App_FutturAllies/staticfiles/;
    }


    location /fidalli/{
        proxy_pass http://180.149.196.17:8000/fidalli/;
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}




verifier Ngnix

# sudo nginx -t

redemarer le server ngnix

# sudo systemctl reload nginx


Test

http://180.149.196.17

ou http://ton-domaine.com


