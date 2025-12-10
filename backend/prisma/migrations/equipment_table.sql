-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  condition TEXT DEFAULT 'good',
  rental_price NUMERIC(10, 2) DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  description TEXT,
  image TEXT,
  location TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on type for faster filtering
CREATE INDEX IF NOT EXISTS idx_equipment_type ON equipment(type);

-- Create index on condition for faster filtering
CREATE INDEX IF NOT EXISTS idx_equipment_condition ON equipment(condition);

-- Insert sample equipment data
INSERT INTO equipment (name, type, condition, rental_price, quantity, description, location, available) VALUES
('Electric Golf Cart', 'Cart', 'excellent', 50.00, 10, '4-seater electric golf cart with GPS', 'Main Center', true),
('Premium Driver Set', 'Clubs', 'excellent', 35.00, 5, 'Professional driver clubs with adjustable loft', 'Pro Shop', true),
('Golf Ball Set (12)', 'Accessories', 'good', 15.00, 50, 'Premium golf balls, set of 12', 'Pro Shop', true),
('Push Cart', 'Cart', 'good', 20.00, 15, 'Lightweight 3-wheel push cart', 'Main Center', true),
('Range Finder', 'Accessories', 'excellent', 25.00, 8, 'Laser range finder with slope calculation', 'Pro Shop', true),
('Iron Set (7-PW)', 'Clubs', 'good', 40.00, 6, 'Complete iron set from 7-iron to pitching wedge', 'Pro Shop', true);
