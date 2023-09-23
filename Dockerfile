FROM node as react-app-build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx
COPY --from=react-app-build /app/build /usr/share/nginx/html
