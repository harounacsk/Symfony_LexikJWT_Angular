# Créer un projet
<br/>
composer create-project symfony/skeleton:"5.4.*" symfony_jwt
<br/>

# Setting up the database URL(.env)
<br/>

DB_USER=hrn	
DB_PASS=my_pass	
DB_NAME=login_jwt	
DB_HOST=127.0.0.1
DB_PORT=3306
DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

php bin/console doctrine:database:create

php bin/console make:user

# Making migration
php bin/console make:migration
# Execute migration
	php bin/console doctrine:migrations:migrate

php bin/console security:hash-password

# install the lexik jwt authentication bundle using this composer command
Composer require lexik/jwt-authentication-bundle

# Generate a secret key and a public key
php bin/console lexik:jwt:generate-keypair

# Cors 
<br/>
composer require nelmio/cors-bundle