FROM node:latest

COPY SIT725_preowned_vehicles /SIT725_preowned_vehicles

WORKDIR /SIT725_preowned_vehicles

RUN apt-get update \
&& apt-get install -y python3 python3-pip python3-venv \
&& python3 -m venv /venv \
&& /venv/bin/pip install joblib==1.3.2 pandas numpy \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/* 

ENV PATH="/venv/bin:$PATH"

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

