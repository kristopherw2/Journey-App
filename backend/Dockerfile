FROM python:alpine

WORKDIR /src
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# This will allow you to pass in credentials.
# The default values are for local development
# but can override these when you run the container.
# It's not completely secure, but good enough.
ENV SECRET_KEY=abc123
ENV DEBUG=True

# COPY ./journey_backend .

COPY ./journey_backend/accounts ./accounts
COPY ./journey_backend/journey_api ./journey_api
COPY ./journey_backend/journey_backend ./journey_backend
COPY ./journey_backend/media ./media
COPY ./journey_backend/db.sqlite3 ./db.sqlite3
COPY ./journey_backend/manage.py ./manage.py

RUN python manage.py makemigrations && python manage.py migrate

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "journey_backend.wsgi:application"]