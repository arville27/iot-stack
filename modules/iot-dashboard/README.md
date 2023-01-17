# IoT-Dashboard

## Overview

This application is designed to provide real-time visualization of guest arrival data collected from IoT devices installed in buildings such as hotels, offices, and apartments. The application allows users to view the number of guests arriving in real-time, track historical data, and set alerts for certain thresholds. This can help building managers and staff keep track of occupancy levels, improve guest experience and manage resources more efficiently.

It is a companion application for the IoT micropython based Guest Notification System, which can be found on the `iot-guest-notification-system` module.

This application receives the guest arrival data from the IoT micropython based Guest Notification System and presents it in an easy to understand visual format.

## Features

- Real-time data visualization
- Historical data tracking
- Send message to IoT device
- User-friendly interface

## Prerequisites

- Docker and Docker Compose installed on the device
- Node.js installed on the device
- Familiarity with running and building Node.js project with Docker container

## Installation

1. First, copy the configuration file from .env.example to .env, adjust the content of the file and please verify all the values are publicly accessible.

- NEXT_PUBLIC_BROKER_HOSTNAME is publicly accessible domain or IP (ex: broker.example.com)
- NEXT_PUBLIC_BROKER_PORT is publicly accessible broker WebSockets port (ex: 443)
- NEXT_PUBLIC_BROKER_TOPIC is the topic that IoT device listen for LCD message

1. Build and run the application using Docker Compose included in this module if you want only test the dashboard itself otherwise use the one in root project. 

```bash
docker-compose up --build
```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Usage

1. After the installation, the application will be running on your local
   host on port 3000
2. Select the device you want to monitor or control from the device list.
3. View real-time data from the device, or use the controls to configure or control the device.
