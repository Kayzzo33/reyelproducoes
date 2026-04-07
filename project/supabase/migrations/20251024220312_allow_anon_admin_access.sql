/*
  # Allow Anonymous Admin Access

  This migration updates the RLS policies to allow anonymous users to manage projects and team members.
  This is suitable for simple portfolio sites where the admin panel doesn't require authentication.

  ## Changes
  
  1. **Projects Table**
     - Drop existing authenticated-only policies for INSERT, UPDATE, DELETE
     - Create new policies that allow both anonymous and authenticated users to manage projects
  
  2. **Team Members Table**
     - Drop existing authenticated-only policies for INSERT, UPDATE, DELETE
     - Create new policies that allow both anonymous and authenticated users to manage team members

  ## Security Note
  
  These policies allow anyone to modify the data. In a production environment, you should:
  - Implement proper authentication
  - Restrict policies to authenticated users only
  - Use auth.uid() checks to ensure users can only modify their own data
*/

-- Drop existing restrictive policies for projects
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Create new permissive policies for projects
CREATE POLICY "Anyone can insert projects"
  ON projects FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update projects"
  ON projects FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete projects"
  ON projects FOR DELETE
  TO anon, authenticated
  USING (true);

-- Drop existing restrictive policies for team_members
DROP POLICY IF EXISTS "Authenticated users can insert team members" ON team_members;
DROP POLICY IF EXISTS "Authenticated users can update team members" ON team_members;
DROP POLICY IF EXISTS "Authenticated users can delete team members" ON team_members;

-- Create new permissive policies for team_members
CREATE POLICY "Anyone can insert team members"
  ON team_members FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update team members"
  ON team_members FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete team members"
  ON team_members FOR DELETE
  TO anon, authenticated
  USING (true);