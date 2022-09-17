FROM python:3.8.12

RUN pip install --upgrade pip
COPY ./ ./
RUN rm -rf .env
RUN pip install -r requirements.txt
RUN pip install gunicorn