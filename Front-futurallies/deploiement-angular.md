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
    server_name 180.149.196.17;  

    root /var/www/ton-site;
    index index.html;

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


