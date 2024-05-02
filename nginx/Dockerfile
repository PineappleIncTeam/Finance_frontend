FROM nginx:1.21.0-alpine
ENV NODE_ENV production

RUN rm /etc/nginx/conf.d/*

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]