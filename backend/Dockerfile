FROM python:3.10

WORKDIR /code

RUN pip install --upgrade pip

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

CMD ["python", "-u", "server.py"]