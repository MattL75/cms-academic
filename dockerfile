FROM php:7.2-apache 
EXPOSE 80
#make the src directory a mounting point for code
VOLUME [ "/src" ]
#specify the http root of the apache document (should be off of the shared folder)
ENV APACHE_DOCUMENT_ROOT /src/api

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN docker-php-ext-install pdo pdo_mysql

