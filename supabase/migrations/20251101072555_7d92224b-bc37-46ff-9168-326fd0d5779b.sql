-- Allow anonymous inserts on contact_submissions in addition to existing policies
CREATE POLICY "Anonymous users can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);
