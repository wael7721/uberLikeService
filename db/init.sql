CREATE TYPE ROLE AS ENUM ('passenger', 'taxi', 'admin');

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password Text NOT NULL,
  user_role ROLE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TYPE AVAILABILITY as ENUM('available','unavailable');

CREATE TABLE IF NOT EXISTS vehicles(
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES users(id) NOT NULL,
  plate_number VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  color VARCHAR,
  vehicle_status AVAILABILITY DEFAULT 'available'
);


CREATE TYPE STATUS as ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS trips(
id SERIAL PRIMARY KEY,
driver_id INTEGER REFERENCES users(id) NOT NULL,
passenger_id INTEGER REFERENCES users(id) NOT NULL,
pickup_location VARCHAR NOT NULL,
dropoff_location VARCHAR NOT NULL,
trip_status STATUS DEFAULT 'requested',
fare DECIMAL(5,2),
start_time TIMESTAMP,
end_time TIMESTAMP
);


CREATE TYPE PAYMENTMETHOD as ENUM('cash','card');

CREATE TABLE IF NOT EXISTS payments (
id SERIAL PRIMARY KEY,
trip_id INTEGER REFERENCES trips(id) NOT NULL,
payment PAYMENTMETHOD,
paid BOOLEAN DEFAULT false,
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rating(
id SERIAL PRIMARY KEY,
from_user_id INTEGER REFERENCES users(id )NOT NULL,
to_user_id INTEGER REFERENCES users(id) NOT NULL,
trip_id INTEGER REFERENCES trips(id) NOT NULL,
rating INTEGER CHECK (rating>=1 AND rating<=5),
review Text,
created_at TIMESTAMP DEFAULT NOW()
);