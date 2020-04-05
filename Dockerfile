# step 1: copy and build
FROM node:12.16.1 as react-build
WORKDIR /app
COPY . ./
RUN npm install --only-prod --no-audit
RUN npm run build

# step 2: production environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
