FROM nginx
COPY dist/Timesheet /usr/share/nginx/html
EXPOSE 80

