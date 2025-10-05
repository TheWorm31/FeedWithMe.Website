-- FeedWithMe Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL,
  message TEXT,
  privacy_accepted BOOLEAN DEFAULT true,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_role ON form_submissions(role);

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new submissions
CREATE POLICY "Allow form submissions" ON form_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy for admin access (you can modify this based on your needs)
CREATE POLICY "Admin access" ON form_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_form_submissions_updated_at 
  BEFORE UPDATE ON form_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional - remove in production)
-- INSERT INTO form_submissions (name, surname, email, role, message) VALUES
-- ('John', 'Doe', 'john@example.com', 'beta-tester', 'Excited to test the app!'),
-- ('Jane', 'Smith', 'jane@example.com', 'early-adopter', 'Looking forward to the launch!');
