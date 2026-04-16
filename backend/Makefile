.PHONY: dev db migrate install

install:
	uv venv && uv pip install -e ".[dev]"

dev:
	uvicorn app.main:app --reload --port 8000

db:
	docker compose up -d db

migrate:
	alembic upgrade head
