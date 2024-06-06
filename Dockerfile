FROM nginx

WORKDIR /

COPY SLI_FE/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY SLI_FE/nginx/nginx.conf /etc/nginx/conf.d

COPY SLI_FE/nginx/certificate.crt /etc/ssl/certs/
COPY SLI_FE/nginx/private.key /etc/ssl/private/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
