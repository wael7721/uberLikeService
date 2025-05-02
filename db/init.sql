CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password Text NOT NULL,
  user_role ENUM('passenger', 'driver', 'admin') NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicles(
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES users(id)
  plate_number VARCHAR,
  model VARCHAR,
  color VARCHAR,
  status ENUM('available','unavailable')
);

CREATE TABLE IF NOT EXISTS trips(
id SERIAL PRIMARY KEY,
driver_id INTEGER REFERENCES users(id),
passenger_id INTEGER REFERENCES users(id),
pickup_location VARCHAR,
dropoff_location VARCHAR,
status ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'),
fare DECIMAL,
start_time TIMESTAMP,
end_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
id SERIAL PRIMARY KEY,
trips_id INTEGER REFERENCES trips(id)
method ENUM('cash','card')
paid BOOLEAN DEFAULT false
created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rating(
id SERIAL PRIMARY KEY,
from_user_id INTEGER REFERENCES users(id),
to_user_id INTEGER REFERENCES users(id),
trip_id INTEGER REFERENCES trips(id),
rating INTEGER CHECK (rating>=1 AND rating<=5),
review Text,
created_at TIMESTAMP
);