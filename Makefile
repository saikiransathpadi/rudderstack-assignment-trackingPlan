# Build the backend and frontend images
build:
	docker-compose build

# Run the backend and frontend containers
up:
	docker-compose up -d

# Stop and remove the containers
down:
	docker-compose down

# View logs from the containers
logs:
	docker-compose logs -f

# Run all tests (if you have test scripts)
test:
	docker-compose run backend npm test
	docker-compose run frontend npm test

