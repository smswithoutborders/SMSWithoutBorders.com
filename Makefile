


all: config build deploy

config:
	@echo "[!] Creating env configs"
	@bash create_env.sh
	@echo "[!] Configs created edit them to suit your needs, then build and deploy"

build:
	@echo "[!] Creating production build ..."
	yarn install
	yarn build

deploy:
	@echo "[!] Deploying built app ..."
	@cp -r build/. /var/www/html/

image:
	@echo "[!] Creating docker image ..."
	@make config
	@docker build -t swob-fe .

container:
	@echo "[!] Starting docker container"
	@docker run -itd --name swob-fe -p 18000:80 swob-fe