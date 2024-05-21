FROM nginx

WORKDIR /

COPY ./dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY nginx/certificate.crt /etc/ssl/certs/
COPY nginx/private.key /etc/ssl/private/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
