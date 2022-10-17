

all: config build deploy

config:
	@echo "[!] Creating env configs"
	@cp env.example .env.development.local
	@cp env.example .env.production.local
	@echo "[!] Configs created edit them to suit your needs, then build and deploy"

build:
	@echo "[!] Creating production build ..."
	yarn install
	yarn build

deploy:
	@echo "[!] Deploying built app ..."
	@cp -r build/. /var/www/html/