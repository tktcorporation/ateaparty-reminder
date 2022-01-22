run:
	docker-compose up -d graphql-engine && cd hasura && sleep 5 && hasura console