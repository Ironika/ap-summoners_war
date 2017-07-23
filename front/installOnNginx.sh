npm install
npm run prod
service nginx stop
cp index.html /var/www/html/index.html
cp build/bundle.js /var/www/html/bundle.js
rm -r /var/www/html/assets
cp -r assets /var/www/html/assets
rm -r build
service nginx start
